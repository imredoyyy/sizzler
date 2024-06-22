import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";

// Utility function to check if a user is an admin
export async function isAdmin(req) {
  try {
    const session = await getServerSession(AuthOptions);
    const email = session?.user?.email;

    if (!email) {
      throw new Error("No session found");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    return user.isAdmin;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
