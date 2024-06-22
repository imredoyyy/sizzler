"use client";

import { useEffect, useContext, useState } from "react";
import { CartContext } from "@/provider/AppContext";
import Container from "@/components/layout/Container";
import { useParams } from "next/navigation";
import OrderPreview from "../OrderPreview";
import OrderPreviewSummary from "../OrderPreviewSummary";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  borderWidth: "3px",
};

const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [orderData, setOrderData] = useState();
  const [viewingOrder, setViewingOrder] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (typeof window !== "undefined") {
      if (window.location.href.includes("clearCart=true")) {
        clearCart();
      }
    }

    if (id) {
      fetch(`/api/orders?_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrderData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("viewingOrder=true")) {
        setViewingOrder(true);
      }
    }
  }, [viewingOrder]);

  return (
    <>
      {loading && (
        <div className="grid min-h-screen w-full place-items-center">
          <ClipLoader
            color="#f13a00"
            size={60}
            loading={loading}
            cssOverride={override}
          />
        </div>
      )}

      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2.5">
              <p className="text-center text-lg text-orange-50">
                Thank you for your order!
              </p>
              {!viewingOrder && (
                <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
                  We will let you know when your order is on it&apos;s way.
                </h2>
              )}
              <p className="text-center text-lg text-black-100">
                We have received your order and now we are processing it.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 font-semibold text-orange-50">
              Order ID: <span className="text-black-100">{orderData?._id}</span>
            </div>
          </div>

          <div className="car-product-container-grid">
            {orderData && (
              <div className="flex flex-col gap-6">
                {orderData.products.map((product, i) => (
                  <OrderPreview key={i} product={product} />
                ))}
              </div>
            )}
            {orderData && (
              <OrderPreviewSummary
                products={orderData?.products}
                totalQuantity={orderData?.products.length}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default OrderPage;
