import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { isAdmin } from "@/utils/isAdmin";
export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const session = await getServerSession(AuthOptions);
    const userEmail = session?.user?.email;
    const userIsAdmin = await isAdmin(session);
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (_id) {
      const order = await Order.findById(_id);
      if (!order) {
        return new Response(JSON.stringify({ error: "Order not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(order), { status: 200 });
    }

    if (userIsAdmin) {
      const orders = await Order.find();
      return new Response(JSON.stringify(orders), { status: 200 });
    }

    if (userEmail) {
      const orders = await Order.find({ userEmail });
      return new Response(JSON.stringify(orders), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  } catch (error) {
    console.error("Error in GET /api/orders:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
