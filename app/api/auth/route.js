import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "../../../db/models/User";
import dbConnect from "../../../db/connect";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await dbConnect(); // Ensure MongoDB connection

  try {
    const { email, password } = await req.json(); // Correct way to parse request body

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    const response = NextResponse.json({ message: "Login successful", userId: user._id, role: user.role });
    response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Secure`);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Error logging in", error: error.message }, { status: 500 });
  }
}
