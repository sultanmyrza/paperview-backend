import { Queue } from "bullmq";
import redisClient from "../config/redis.js";

// Email queue
export const emailQueue = new Queue("email", {
  connection: redisClient,
});

export default {
  emailQueue,
};

