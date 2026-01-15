import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URL) {
    throw new Error("Please provide MONGO_URL in the environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("Order DB connected to MongoDB");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
