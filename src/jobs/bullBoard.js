import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { emailQueue } from "./queues.js";

// Create Bull Board server adapter
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

// Initialize Bull Board with all queues
export const { addQueue, removeQueue, setQueues, replaceQueues } =
  createBullBoard({
    queues: [new BullMQAdapter(emailQueue)],
    serverAdapter: serverAdapter,
  });

// Export the router to mount in Express app
export const bullBoardRouter = serverAdapter.getRouter();
