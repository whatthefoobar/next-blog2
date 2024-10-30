import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.next();

  // Clear the cookie
  res.cookies.set("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  // Return the response
  return NextResponse.json({ message: "Logged out successfully" });
}

// export const POST = () => {
//   return new NextResponse(
//     JSON.stringify({ message: "Logged out successfully" }),
//     {
//       status: 200,
//       headers: { "Set-Cookie": "jwt=; Max-Age=0; Path=/; HttpOnly;" },
//     }
//   );
// };
