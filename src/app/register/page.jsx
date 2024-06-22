import Register from "./Register";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(AuthOptions);
  if (session) redirect("/");

  return <Register />;
};

export default RegisterPage;
