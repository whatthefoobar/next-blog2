import Post from "@/lib/models/post";
import { NextApiRequest, NextApiResponse } from "next";
import { IPost } from "../types";

export const getAllPosts = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const posts: IPost[] = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    // Use type assertion to access error properties
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, content } = req.body;

    const newPost = new Post({ title, content });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ message: errorMessage });
  }
};

export const getPostById = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const updatePost = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
