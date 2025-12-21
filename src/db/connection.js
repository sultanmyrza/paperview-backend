import mongoose from "mongoose";

const connectionString =
  process.env.MONGODB_URI || "mongodb://db:27017/paperview";

try {
  await mongoose.connect(connectionString);
} catch (e) {
  console.error("Connection error:", e);
}

export default mongoose.connection;
