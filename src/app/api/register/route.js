import { User } from "@/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to the database if not already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "Account created." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering." },
      { status: 500 },
    );
  }
}
