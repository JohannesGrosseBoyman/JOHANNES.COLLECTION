import { NextResponse } from "next/server";
import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category"); // Get category from query params


  let products;

  try {
    if (category && category !== "All products") { // Check if category is provided and not "All products"

      products = await Product.find({ category: category }) // Match by category name

    } else {  
    products = await Product.find();
    }

    return NextResponse.json(products, { status: 200 });

  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json(); // Get JSON data from request body

    // Validate required fields
    const requiredFields = ["name", "images", "price", "colors", "description", "category"];
    for (let field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 });
      }
    }

    // Create and save a new product
    const newProduct = new Product(body);
    await newProduct.save();

    return NextResponse.json({ message: "Product added successfully", product: newProduct}, { status: 201 });

  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: "Error adding product" }, { status: 500 });
  }
}