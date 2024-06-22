import React from "react";
import LogIn from "./Login";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(AuthOptions);

  if (session) redirect("/");

  return <LogIn />;
};

export default LoginPage;
