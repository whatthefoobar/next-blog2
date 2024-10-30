import { NextResponse } from "next/server";
//import connectDB from "@/lib/db"; // Ensure this path is correct
import Post from "@/lib/models/post"; // Ensure this path is correct
import connectDB from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  const { postId } = params; // Extract the post ID from the request parameters

  //await connectDB(); // Connect to the database

  try {
    const post = await Post.findById(postId); // Fetch the post by ID

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new NextResponse("Error fetching post", { status: 500 });
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { postId: string } }
) => {
  await connectDB();

  try {
    const { title, description, tags, image } = await request.json();
    const updatedData = { title, description, tags, image };

    const updatedPost = await Post.findByIdAndUpdate(
      params.postId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return NextResponse.json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    return new NextResponse(`Error updating post: ${error}`, { status: 500 });
  }
};

// DELETE request to delete a post
export const DELETE = async (
  request: Request,
  { params }: { params: { postId: string } }
) => {
  await connectDB();

  try {
    const deletedPost = await Post.findByIdAndDelete(params.postId);

    if (!deletedPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return new NextResponse(`Error deleting post: ${error}`, { status: 500 });
  }
};

// import type { NextApiRequest, NextApiResponse } from "next";
// import { getPostById, updatePost } from "../../controllers/postControllers";
// // Adjust the path to your controller file

// // rewrite this so i can fetch indiv blog by id
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { postId } = req.query;

//   if (!postId || typeof postId !== "string") {
//     return res.status(400).json({ message: "Invalid Post ID" });
//   }

//   switch (req.method) {
//     case "GET":
//       await getPostById(req, res, postId);
//       break;
//     case "PUT":
//       await updatePost(req, res, postId);
//       break;
//     default:
//       res.setHeader("Allow", ["GET", "PUT"]);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
