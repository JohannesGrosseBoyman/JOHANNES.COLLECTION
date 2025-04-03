import { authenticateUser } from "../../../middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { user, error } = await authenticateUser(req);
  if (error) return error; // If authentication fails, return the error response

  return NextResponse.json({ message: "Protected data", user });
}
