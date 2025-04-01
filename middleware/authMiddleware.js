import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function authenticateUser(req) {
  try {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const token = cookieHeader.split("token=")[1]?.split(";")[0]; // Extract JWT token
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // Attach user to request
    return null; // No error, so return nothing (continue processing)
  } catch (error) {
    console.error("JWT verification error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}
