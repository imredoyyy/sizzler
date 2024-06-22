"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Container from "@/components/layout/Container";
import { CartContext } from "@/provider/AppContext";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Plus, Minus, Trash } from "lucide-react";
import EmptyCart from "/public/empty-cart.png";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const Cart = () => {
  const {
    cartProducts,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotalQuantity,
  } = useContext(CartContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=true")) {
        toast.error("Payment failed!");
      }
    }
  }, []);

  useEffect(() => {
    document.title = "Cart | Sizzler";
  });

  const totalAmount = () => {
    let totalWithoutTaxCents = 0;
    let deliveryFee = 0;

    cartProducts.forEach((product) => {
      totalWithoutTaxCents += product.priceCents * product.quantity;
    });

    const totalTaxCents = Math.round(totalWithoutTaxCents * 0.1);
    const totalWithTaxCents = totalWithoutTaxCents + totalTaxCents;
    deliveryFee = totalWithoutTaxCents >= 5000 ? 0 : 500;

    const totalWithoutTax = formatCurrency(totalWithoutTaxCents);
    const totalTax = formatCurrency(totalTaxCents);
    const subtotal = formatCurrency(totalWithTaxCents + deliveryFee);

    return {
      totalWithoutTax,
      totalTax,
      subtotal,
      deliveryFee,
    };
  };

  const proceedToCheckout = async () => {
    const checkoutPromise = fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartProducts,
      }),
    });

    toast.promise(
      checkoutPromise
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create checkout session");
          }
          return response.json();
        })
        .then(({ url }) => {
          window.location.href = url;
          return "Redirecting to checkout...";
        }),
      {
        loading: "Processing your order...",
        success: "Redirecting to checkout...",
        error: "An error occurred while processing your order",
      },
    );
  };

  return (
    <>
      <Breadcrumbs page="Cart" pageName="Cart" />
      <Container>
        <div className="flex flex-col gap-10">
          {cartProducts.length === 0 ? (
            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0.8, y: 100, scale: 0.75 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center">
                <Image
                  src={EmptyCart}
                  alt="Empty Cart"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex flex-col items-center gap-8">
                <h1 className="text-center text-3xl font-bold text-orange-50 md:text-5xl">
                  Your cart is empty
                </h1>

                <Link href="/">
                  <Button size="lg" radius="sm">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="car-product-container-grid">
              <div className="flex flex-col gap-6">
                <AnimatePresence mode="popLayout">
                  {cartProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      className="cart-product-grid"
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="flex w-full justify-center" layout>
                        <div className="flex size-[100px] justify-center rounded-full bg-slate-300 p-1">
                          <Image
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            width="auto"
                            height="auto"
                            className="aspect-square size-[100px] object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between gap-4">
                        <div className="flex flex-col gap-2.5">
                          <Link
                            href={`/products/${product.category}/${product.id}`}
                            className="transition-colors duration-200 hover:text-orange-50"
                          >
                            <h2 className="text-lg font-bold md:text-2xl">
                              {product.name}
                            </h2>
                          </Link>
                          {product.size && (
                            <p className="text-sm">
                              Size:{" "}
                              <span className="capitalize text-black-100">
                                {product.size}
                              </span>
                            </p>
                          )}
                          {product.extras?.length > 0 && (
                            <p className="text-sm">
                              Extras:{" "}
                              <span className="capitalize text-black-100">
                                {product.extras
                                  .map((extra) => extra)
                                  .join(", ")}
                              </span>
                            </p>
                          )}
                          <h3 className="font-bold text-orange-50 md:text-xxl">
                            ${formatCurrency(product.priceCents)}
                          </h3>
                        </div>

                        <div className="grid h-12 w-full max-w-[180px] grid-cols-4 place-items-center overflow-hidden rounded-md border border-slate-300">
                          <button
                            onClick={() =>
                              decrementQuantity(
                                product.id,
                                product.size,
                                product.extras,
                              )
                            }
                            className="grid h-full w-full place-items-center border-r transition-colors duration-200 active:bg-slate-100 md:hover:bg-slate-100 [&>svg]:stroke-orange-50"
                            aria-label="Decrement Quantity"
                          >
                            <Minus className="size-5 md:size-6" />
                          </button>
                          <p className="grid h-full w-full place-items-center bg-slate-100 text-lg font-semibold">
                            {product.quantity}
                          </p>
                          <button
                            onClick={() =>
                              incrementQuantity(
                                product.id,
                                product.size,
                                product.extras,
                              )
                            }
                            className="grid h-full w-full place-items-center border-l transition-colors duration-200 active:bg-slate-100 md:hover:bg-slate-100 [&>svg]:stroke-orange-50"
                            aria-label="Increment Quantity"
                          >
                            <Plus className="size-5 md:size-6" />
                          </button>
                          <button
                            onClick={() =>
                              removeFromCart(
                                product.id,
                                product.size || null,
                                product.extras || null,
                              )
                            }
                            className="grid h-full w-full place-items-center border-l transition-colors duration-200 active:bg-slate-100 md:hover:bg-slate-100 [&>svg]:stroke-orange-50"
                            aria-label="Remove from Cart"
                          >
                            <Trash className="size-5 md:size-6" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {cartProducts && cartProducts.length > 0 && (
                <div className="h-fit rounded-md border border-orange-100 px-3 py-5">
                  <div className="flex flex-col gap-4">
                    <div className="text-lg font-bold text-orange-50 lg:text-xl">
                      Order Summary
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2 border-b border-slate-300 pb-2">
                        <div className="flex items-center justify-between">
                          <div>Items ({getTotalQuantity(cartProducts)}):</div>
                          <div>${totalAmount().totalWithoutTax}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>Total without tax:</div>
                          <div>${totalAmount().totalWithoutTax}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>Estimated tax (10%):</div>
                          <div>${totalAmount().totalTax}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>Delivery Fee:</div>
                          <div>
                            ${formatCurrency(totalAmount().deliveryFee)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-orange-50">
                          Subtotal:
                        </div>
                        <div className="font-bold text-orange-50">
                          ${totalAmount().subtotal}
                        </div>
                      </div>

                      <Button size="lg" radius="sm" onClick={proceedToCheckout}>
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Cart;
