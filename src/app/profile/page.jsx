import ProfilePageForm from "./ProfilePageForm";
import Container from "@/components/layout/Container";

export const metadata = {
  title: "Profile | Sizzler",
};

const ProfilePage = async () => {
  return (
    <Container>
      <ProfilePageForm />
    </Container>
  );
};

export default ProfilePage;
