import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") }); // Explicitly load .env.local
// dotenv.config(); // Load environment variables

import mongoose from "mongoose";
import User from "../db/models/User.js"; // Ensure correct path


const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing. Check your .env.local file.");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

async function createAdminUser() {
  try {
    const admin = await User.findOne({ email: "bridget@example.com" });
    if (admin) {
      console.log("✅ Admin already exists:", admin);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10); // Change "admin123" to  password

    const adminUser = new User({
      name: "Name User",
      email: "email User",
      password: hashedPassword,
      phone: "+233558034906",
      address: {
        street: "",
        city: "Berekum",
        region: "Bono",
        country: "Ghana",
      },
      role: "admin",
    });

    await adminUser.save();
    console.log("✅ Admin user created!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
}

createAdminUser().catch(console.error);
