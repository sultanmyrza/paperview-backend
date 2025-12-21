import { Redis } from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: null, // Required by BullMQ for blocking operations
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

redisClient.on("close", () => {
  console.log("Redis connection closed");
});

export default redisClient;

