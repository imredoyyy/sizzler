import { Suspense } from "react";
import Orders from "./Orders";
import Container from "@/components/layout/Container";

export const metadata = {
  title: "Orders | Sizzler",
};

const OrderPage = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Orders />
      </Container>
    </Suspense>
  );
};

export default OrderPage;
