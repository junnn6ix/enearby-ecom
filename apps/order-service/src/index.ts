import Fastify from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { connectOrderDB } from "@repo/order-db";
import { orderRoute } from "./routes/order.js";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscription } from "./utils/subscription.js";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
  return reply.send({
    message: "Order Service:Authenticated",
    userId: request.userId,
  });
});

const start = async () => {
  try {
    console.log("Starting order-service initialization...");

    await Promise.all([
      connectOrderDB(),
      producer.connect(),
      consumer.connect(),
    ]);

    console.log("All connections established successfully");

    await runKafkaSubscription();
    console.log("Kafka subscription started");

    await fastify.listen({ port: 8001 });
    console.log("Order Service is running on port 8001");
  } catch (err) {
    console.error("Failed to start order-service:", err);
    process.exit(1);
  }
};
start();

fastify.register(orderRoute);
