import express from "express";
import { emailQueue } from "../jobs/queues.js";

const router = express.Router();

// POST /api/test/email - Add email job to queue
router.post("/email", async (req, res) => {
  try {
    const { to, subject, body } = req.body;

    // Validate required fields
    if (!to || !subject || !body) {
      return res.status(400).json({
        error: "Missing required fields: to, subject, body",
      });
    }

    // Add job to queue
    const job = await emailQueue.add("send-email", { to, subject, body });

    res.status(201).json({
      message: "Email job added to queue",
      jobId: job.id,
      data: { to, subject, body },
    });
  } catch (err) {
    console.error("Error adding email job:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
