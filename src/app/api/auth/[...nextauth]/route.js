import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";

export const AuthOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Checking database connection
          if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URL);
          }

          // Find user by email
          const user = await User.findOne({ email });

          // If no user found, return null
          if (!user) {
            return null;
          }

          // Compare passwords
          const passwordOk = await bcrypt.compare(password, user.password);

          // Check if password is correct
          if (passwordOk) {
            return user; // Password is correct
          } else {
            return null; // Password incorrect
          }
        } catch (error) {
          console.error(error);
          return null; // Return null if any error happens
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
