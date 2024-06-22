import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/Container";
import ErrorImage from "/public/404.png";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Page Not Found | Sizzler",
};

const ErrorPage = () => {
  return (
    <Container>
      <div className="flex flex-col justify-center gap-12">
        <div className="flex justify-center">
          <Image src={ErrorImage} width={600} height={320} alt="error" />
        </div>

        <div className="flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-bold md:text-[40px]">
            Sorry, the page not found.
          </h1>
          <Link href={"/"}>
            <Button radius="sm" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
