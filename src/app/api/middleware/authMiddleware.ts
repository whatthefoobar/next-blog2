import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/lib/models/user";

// Protect middleware function for Next.js
export const protect = async (req: NextRequest) => {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authorized, no token" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Attach the user object to the request headers for use in handlers
    const headers = new Headers(req.headers);
    headers.set("user", JSON.stringify(user));

    return NextResponse.next({
      headers,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Not authorized, token failed" },
      { status: 401 }
    );
  }
};
