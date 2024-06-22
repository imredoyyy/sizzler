import mongoose from "mongoose";
import { Reservation } from "@/models/Reservation";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  const data = await req.json();

  const reservation = await Reservation.create(data);

  return NextResponse.json(reservation);
}
