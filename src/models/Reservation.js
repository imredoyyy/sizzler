import mongoose, { Schema, models } from "mongoose";

const ReservationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    persons: { type: String, required: true }, // Ensure this field is defined correctly
  },
  { timestamps: true },
);

export const Reservation =
  models?.Reservation || mongoose.model("Reservation", ReservationSchema);
