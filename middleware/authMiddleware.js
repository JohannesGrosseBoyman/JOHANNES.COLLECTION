import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/db/models/User"; // Ensure correct path for User model
import connectDB from "@/db/connect"; // Ensure database connection

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

    await connectDB(); // Ensure database connection

    // Fetch user from database to get `_id`
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Attach the full user object to the request
    req.user = {
      _id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
      address: user.address,
      phone: user.phone,
    };
    return null;
  } catch (error) {
    console.error("❌ JWT verification error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}
