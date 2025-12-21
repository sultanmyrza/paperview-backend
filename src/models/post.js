import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{ type: String }],
    comments: [
      {
        author: { type: String },
        body: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
); // Adds createdAt/updatedAt automatically

const Post = mongoose.model("Post", postSchema);

export default Post;
