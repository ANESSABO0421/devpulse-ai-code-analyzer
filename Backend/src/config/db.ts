import mongoose from "mongoose";
import dotenv from "dotenv";
export const connectDb = async () => {
  try {
    dotenv.config()
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("MongoDB conncected successfully✅");
  } catch (error) {
    console.log("Cannot connect to mongodb", error);
    process.exit(1);
  }
};
