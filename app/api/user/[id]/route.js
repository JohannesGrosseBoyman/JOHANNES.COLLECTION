import { NextResponse } from "next/server";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = await params; // Get user ID from URL

  if (!id || id === "undefined") {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  try {
    const user = await User.findById(id).select("-password");
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user: ", error);
    return NextResponse.json(
      { message: "Error fetching user data" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  await dbConnect();

  try {
    const { id } = params; // ✅ Await is not needed, Next.js now handles it automatically

    // ✅ Corrected request object name
    const body = await request.json();

    const { name, phone, address } = body;
    if (!name || !phone || !address) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, phone, address },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error fetching user: ", error);
    return NextResponse.json(
      { message: "Error fetching updated User" },
      { status: 500 }
    );
  }
}
