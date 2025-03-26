import { NextResponse } from "next/server";
import dbConnect from "../../../db/connect";
import Category from "../../../db/models/Category";

export async function GET() {
  await dbConnect();

  try {
    const categories = await Category.find();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ message: "Error fetching categories" }, { status: 500 });
  }
}
