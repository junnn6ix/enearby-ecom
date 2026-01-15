import { consumer } from "./kafka";
import { createOrder } from "./order";

export const runKafkaSubscription = async () => {
  await consumer.subscribe([
    {
      topicName: "payment.successful",
      topicHandler: async (orderData) => {
        console.log(
          "Received message: payment.successful",
          JSON.stringify(orderData, null, 2)
        );
        await createOrder(orderData);
      },
    },
    {
      topicName: "payment.pending",
      topicHandler: async (orderData) => {
        console.log(
          "Received message: payment.pending",
          JSON.stringify(orderData, null, 2)
        );
        await createOrder(orderData);
      },
    },
    {
      topicName: "payment.failed",
      topicHandler: async (orderData) => {
        console.log(
          "Received message: payment.failed",
          JSON.stringify(orderData, null, 2)
        );
        await createOrder(orderData);
      },
    },
    {
      topicName: "payment.expired",
      topicHandler: async (orderData) => {
        console.log(
          "Received message: payment.expired",
          JSON.stringify(orderData, null, 2)
        );
        await createOrder(orderData);
      },
    },
  ]);
};
