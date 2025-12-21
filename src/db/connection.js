import mongoose from "mongoose";
import { env } from "../config/env.js";

const connectionString = env.MONGODB_URI;

try {
  await mongoose.connect(connectionString);
} catch (e) {
  console.error("Connection error:", e);
}

export default mongoose.connection;
