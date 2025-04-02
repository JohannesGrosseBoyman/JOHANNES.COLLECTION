import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function authenticateUser(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("🚨 No Authorization header or incorrect format");
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1]; // ✅ Extract token correctly
    console.log("🔍 Received Token:", token);

    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    req.user = decoded;
    return null;
  } catch (error) {
    console.error("❌ JWT verification error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}
