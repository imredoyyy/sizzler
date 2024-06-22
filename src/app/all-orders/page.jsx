import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Orders from "./Orders";
import { isAdmin } from "@/utils/isAdmin";
import Container from "@/components/layout/Container";
import UserTab from "@/components/layout/UserTab";

export const metadata = {
  title: "Orders | Sizzler",
};

const OrderPage = async () => {
  const session = await getServerSession(AuthOptions);

  const userIsAdmin = await isAdmin(session);

  if (!session) {
    redirect("/login");
  }

  return (
    <Container>
      <UserTab isAdmin={userIsAdmin} />
      <Orders userIsAdmin={userIsAdmin} />
    </Container>
  );
};

export default OrderPage;
