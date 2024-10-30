import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    image: { type: String, required: false },
    username: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
