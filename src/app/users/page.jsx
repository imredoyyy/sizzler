import Users from "./UserData";
import Container from "@/components/layout/Container";
import UserTab from "@/components/layout/UserTab";

export const metadata = {
  title: "Users | Sizzler",
};

const UsersPage = () => {
  return (
    <Container>
      <Users />
    </Container>
  );
};

export default UsersPage;
