import mongoose from "mongoose";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { isAdmin } from "@/utils/isAdmin";

export const maxDuration = 40;
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const userIsAdmin = await isAdmin(getServerSession(AuthOptions));

    if (!userIsAdmin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const users = await User.find();
    return Response.json(users);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
