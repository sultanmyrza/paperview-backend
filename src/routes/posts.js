import express from "express";
import Post from "../models/post.js";

const router = express.Router();

// GET /posts - List 50 posts
router.get("/", async (req, res) => {
  try {
    const results = await Post.find({}).limit(50).sort({ date: -1 }); // Optional: sort by newest
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /posts/latest - Latest 3 posts
router.get("/latest", async (req, res) => {
  try {
    const results = await Post.find({})
      .sort({ date: -1 })
      .limit(3)
      .select("author title tags date"); // Project specific fields
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /posts/:id - Single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /posts - Create new post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost); // Return the created post
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /posts/comment/:id - Add comment
router.patch("/comment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });

    post.comments.push(req.body); // Assumes req.body has { author, body }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /posts/:id - Delete post
router.delete("/:id", async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted", deletedCount: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
