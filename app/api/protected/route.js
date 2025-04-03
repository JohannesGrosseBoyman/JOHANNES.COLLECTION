import { authenticateUser } from "../../../middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function GET(req) {
  const authResponse = await authenticateUser(req);
  if (authResponse) return authResponse; // If authentication fails, return the error response

  return NextResponse.json({ message: "Protected data", user: req.user });
}
