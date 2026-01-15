import { Order } from "@repo/order-db";
import { OrderType } from "@repo/types";
import { producer } from "./kafka";

export const createOrder = async (order: OrderType) => {
  console.log("Creating order with data:", JSON.stringify(order, null, 2));
  const newOrder = new Order(order);
  try {
    const order = await newOrder.save();
    producer.send("order.created", {
      value: {
        orderId: order._id.toString(),
        userId: order.userId,
        email: order.email,
        amount: order.amount,
        status: order.status,
      },
    });
    console.log("Order saved successfully with ID:", order._id);
    return order;
  } catch (error) {
    console.error("Failed to save order:", error);
    throw error;
  }
};
