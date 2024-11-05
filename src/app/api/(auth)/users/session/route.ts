// checks if user is logged in by fetching the jwt token from http cookie and  decodes it to get the userId with which it can fetch user
// and returns a user object to put in the context
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";

interface JwtPayload {
  userId: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  await connectDB();

  // Retrieve the JWT token from cookies
  const token = request.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Find the user based on the decoded ID
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Construct response with user data
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}
