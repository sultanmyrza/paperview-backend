import { Worker } from "bullmq";
import "./loadEnvironment.js"; // Load environment variables
import redisClient from "./config/redis.js";
import sendEmail from "./jobs/processors/sendEmail.js";

// Email worker
const emailWorker = new Worker(
  "email",
  async (job) => {
    return await sendEmail(job);
  },
  {
    connection: redisClient,
    concurrency: 5, // Process up to 5 jobs concurrently
  }
);

emailWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});

emailWorker.on("error", (err) => {
  console.error("❌ Worker error:", err);
});

console.log("👷 Email worker started");

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing workers...");
  await emailWorker.close();
  await redisClient.quit();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, closing workers...");
  await emailWorker.close();
  await redisClient.quit();
  process.exit(0);
});

