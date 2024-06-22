import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";

export const maxDuration = 60;

export async function PUT(req) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const data = await req.json();
    const session = await getServerSession(AuthOptions);
    const loggedInUserEmail = session?.user?.email;

    // Find the logged-in user's details
    const loggedInUser = await User.findOne({ email: loggedInUserEmail });

    if (!loggedInUser) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not found",
        }),
        { status: 404 },
      );
    }

    // Check if the logged-in user is an admin
    const isAdmin = loggedInUser.isAdmin;

    // Extract the target user's email and the data to be updated
    const { email: targetUserEmail, ...updateData } = data;

    // If the user is not an admin, they can only update their own profile
    if (!isAdmin && loggedInUserEmail !== targetUserEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized to update other user's information",
        }),
        { status: 403 },
      );
    }

    // Update the target user's information
    await User.updateOne({ email: targetUserEmail }, updateData);

    return new Response(
      JSON.stringify({
        success: true,
      }),
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500 },
    );
  }
}

export async function GET() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  const session = await getServerSession(AuthOptions);
  const email = session?.user?.email;

  if (!email) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "User not found",
      }),
      { status: 404 },
    );
  }

  const user = await User.findOne({ email }).lean();
  const userInfo = await User.findOne({ email }).lean();

  return Response.json({ user, ...userInfo });
}
