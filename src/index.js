import express from "express";
import "./loadEnvironment.js"; // Loads .env
import "./db/connection.js"; // Loads db connection
import postRoutes from "./routes/posts.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/posts", postRoutes);

// Optional: Health check
app.get("/", (req, res) => {
  res.json({ message: "Paperview API is running" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
