import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import generateToken from "@/lib/generateToken";
import User from "@/lib/models/user";

export const POST = async (request: Request) => {
  await connectDB();
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);

      // Create a response and set the token as an HTTP-only cookie
      const response = NextResponse.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      });

      // Set the token as an HTTP-only cookie
      response.cookies.set("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
        path: "/", // Make cookie available to the entire site
      });

      return response;
    } else {
      return new NextResponse("Invalid email or password", { status: 401 });
    }
  } catch (error) {
    return new NextResponse("Error logging in", { status: 500 });
  }
};
