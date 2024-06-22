import { User } from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    // Connect to the database if not already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");

    if (user) {
      return NextResponse.json({ user: true }, { status: 200 });
    } else {
      return NextResponse.json({ user: false }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
