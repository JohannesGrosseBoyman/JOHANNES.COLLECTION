// app/api/user/register/route.js
import User from "@/db/models/User";
import dbConnect from "@/db/connect"; // adjust if your DB connection file is named differently
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  const { name, email, password, phone, address } = await req.json();


  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Name, email, and password are required" },
      { status: 400 }
    );
  }
  
  


  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
  });

  // Generate JWT (replace with env key later)
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });

  // Set cookie for auto-login
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // Return public user data
  return NextResponse.json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
      role: newUser.role,
    },
  });
}
