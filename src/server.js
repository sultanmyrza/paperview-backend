import express from "express";
import "./loadEnvironment.js"; // Loads .env
import { env } from "./config/env.js";
import "./db/connection.js"; // Loads db connection
import { bullBoardRouter } from "./jobs/bullBoard.js";
import postRoutes from "./routes/posts.js";
import testRoutes from "./routes/test.js";

const app = express();
const port = env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/test", testRoutes);
app.use("/admin/queues", bullBoardRouter);

// Optional: Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Service is healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Paperview API is running" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
