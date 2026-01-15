import sendMail from "./utils/mailer";
import { createConsumer, createKafkaClient } from "@repo/kafka";

const kafka = createKafkaClient("email-service");
const consumer = createConsumer(kafka, "email-service");

const start = async () => {
  try {
    await consumer.subscribe([
      {
        topicName: "user.created",
        topicHandler: async (message) => {
          const { email, username } = message.value;

          if (email) {
            await sendMail({
              email,
              subject: "Welcome to eNearby!",
              text: `Hello ${username},\n\nThank you for registering at eNearby. We're excited to have you on board!\n\nBest regards,\neNearby Team`,
            });
          }
        },
      },
      {
        topicName: "order.created",
        topicHandler: async (message) => {
          const { orderId, email, amount, status } = message.value;

          if (email) {
            await sendMail({
              email,
              subject: "Order Confirmation - eNearby",
              text: `Hello ${email},\n\nThank you for your order at eNearby.\nYour order ID is ${orderId}\nAmount: ${(amount / 100).toFixed(1)}\nStatus: ${status}. We're processing it now!\n\nBest regards,\neNearby Team`,
            });
          }
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

start();
