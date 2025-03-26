import { NextResponse } from "next/server";
import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}