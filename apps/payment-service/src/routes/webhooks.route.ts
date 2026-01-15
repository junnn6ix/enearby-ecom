import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";
import { producer } from "../utils/kafka";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const webhookRoute = new Hono();

webhookRoute.post("/stripe", async (c) => {
  const body = await c.req.text();
  const sig = c.req.header("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (error) {
    console.log("Webhooks verification error");
    return c.json({ error: "Webhooks verification error" }, 400);
  }

  console.log("=== Received Stripe Event ===");
  console.log("Event type:", event.type);
  console.log("Event ID:", event.id);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed:", session.id);
        console.log("Payment status:", session.payment_status);
        console.log("Payment intent:", session.payment_intent);
        console.log(
          "Customer details:",
          JSON.stringify(session.customer_details, null, 2)
        );

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );

        console.log(
          "Line items from Stripe:",
          JSON.stringify(lineItems.data, null, 2)
        );

        // Determine order status based on payment status and payment intent
        let orderStatus: "success" | "pending" | "processing" | "failed" =
          "processing";
        let kafkaTopic = "payment.pending";

        if (session.payment_status === "paid") {
          orderStatus = "success";
          kafkaTopic = "payment.successful";
        } else if (session.payment_status === "unpaid") {
          // Check if there's a payment_intent to see if it failed or is truly pending
          if (session.payment_intent) {
            try {
              const paymentIntent = await stripe.paymentIntents.retrieve(
                session.payment_intent as string
              );
              console.log("Payment Intent status:", paymentIntent.status);
              console.log(
                "Payment Intent last error:",
                paymentIntent.last_payment_error
              );

              // If payment intent exists and failed, mark as failed
              if (
                paymentIntent.status === "canceled" ||
                paymentIntent.status === "requires_payment_method" ||
                paymentIntent.last_payment_error
              ) {
                orderStatus = "failed";
                kafkaTopic = "payment.failed";
              } else {
                orderStatus = "pending";
                kafkaTopic = "payment.pending";
              }
            } catch (error) {
              console.error("Error retrieving payment intent:", error);
              orderStatus = "pending";
              kafkaTopic = "payment.pending";
            }
          } else {
            // No payment intent means pending
            orderStatus = "pending";
            kafkaTopic = "payment.pending";
          }
        }

        const orderData = {
          userId: session.client_reference_id,
          email: session.customer_details?.email,
          amount: session.amount_total,
          status: orderStatus,
          products: lineItems.data.map((item) => ({
            name: item.description || "Unknown Product",
            quantity: item.quantity || 1,
            price: item.price?.unit_amount || 0,
          })),
          shippingAddress:
            session.customer_details?.address?.line1 || "No address provided",
        };

        console.log(
          `Sending order to Kafka topic: ${kafkaTopic}`,
          JSON.stringify(orderData, null, 2)
        );

        try {
          await producer.send(kafkaTopic, orderData);
          console.log(`Order sent to Kafka (${kafkaTopic}) successfully`);
        } catch (kafkaError) {
          console.error(
            `Failed to send to Kafka topic ${kafkaTopic}:`,
            kafkaError
          );
          throw kafkaError;
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }
  } catch (error) {
    console.error("=== Error processing webhook ===");
    console.error("Error:", error);
    console.error("Event type:", event.type);
    return c.json({ error: "Error processing webhook" }, 500);
  }

  return c.json({ received: true });
});

export default webhookRoute;
