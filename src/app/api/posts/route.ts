import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { IPost } from "../types";
import Post from "@/lib/models/post";
// import { log } from "console";

// gets all blogs succesfully
export const GET = async () => {
  connectDB();
  try {
    const posts: IPost[] = await Post.find();
    // res.status(200).json(posts);
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    // Use type assertion to access error properties
    return new NextResponse(`Error in fetching users ${error}`, {
      status: 500,
    });
  }
};

// not tested yet
export const POST = async (request: Request) => {
  try {
    const { title, description, tags, username, image } = await request.json();

    // Log values for debugging
    console.log("from Fr:", { title, description, tags, username, image });

    // Ensure the database is connected
    //await connectDB();

    // Create a new post (adjust model fields accordingly)
    const newPost = new Post({ title, description, tags, image, username });
    await newPost.save();
    console.log("new post:", newPost);

    return new NextResponse(
      JSON.stringify({ message: "Post created successfully!", post: newPost }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error in creating post", error }),
      { status: 500 }
    );
  }
};
