import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userEmail: { type: String },
    products: { type: Array },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Order = models?.Order || mongoose.model("Order", OrderSchema);
