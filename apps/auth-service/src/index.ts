import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeAdmin } from "./middleware/authMiddleware";
import userRoute from "./routes/user.route";
import { producer } from "./utils/kafka";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002"],
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.use("/users", shouldBeAdmin, userRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const start = async () => {
  try {
    // Connect Kafka producer first
    await producer.connect();
    console.log("Kafka producer connected successfully");

    app.listen(8003, () => {
      console.log("Auth Service is running on port 8003");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await producer.disconnect();
  console.log("Kafka producer disconnected");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await producer.disconnect();
  console.log("Kafka producer disconnected");
  process.exit(0);
});
