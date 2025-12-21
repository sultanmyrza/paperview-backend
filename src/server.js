import express from "express";
import "./loadEnvironment.js"; // Loads .env
import "./db/connection.js"; // Loads db connection
import { bullBoardRouter } from "./jobs/bullBoard.js";
import postRoutes from "./routes/posts.js";
import testRoutes from "./routes/test.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/test", testRoutes);
app.use("/admin/queues", bullBoardRouter);

// Optional: Health check
app.get("/", (req, res) => {
  res.json({ message: "Paperview API is running" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
