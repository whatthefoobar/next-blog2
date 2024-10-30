import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { protect } from "@/app/api/middleware/authMiddleware";

// Handler to get user profile (GET request)
export const GET = async (req: NextRequest) => {
  await connectDB();

  const protectionResult = await protect(req);
  if (protectionResult) return protectionResult; // Check if the user is authenticated

  // Extract user data from the request headers
  const user = JSON.parse(req.headers.get("user")!);

  // Return user profile data
  return NextResponse.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
  });
};

// Handler to update user profile (PUT request)
export const PUT = async (req: NextRequest) => {
  await connectDB();

  const protectionResult = await protect(req);
  if (protectionResult) return protectionResult; // Check if the user is authenticated

  // Extract user data from the request headers
  const user = JSON.parse(req.headers.get("user")!);

  // Get the data from the request body
  const { username, email, password } = await req.json();

  // Find the user in the database
  const foundUser = await User.findById(user._id);

  if (foundUser) {
    foundUser.username = username || foundUser.username;
    foundUser.email = email || foundUser.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      foundUser.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await foundUser.save();

    // Return the updated profile data
    return NextResponse.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    });
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
};
