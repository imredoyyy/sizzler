"use client";
import { useContext } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { CartContext } from "@/provider/AppContext";
import Button from "./Button";
import toast from "react-hot-toast";

const HorizontalProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const quantity = 1;
  const selectedSize = "regular";

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    toast.success("Added to the cart!");
  };
  return (
    <div className="grid max-w-[550px] grid-cols-2 items-center gap-6 rounded-lg bg-zinc-50 p-4 shadow-md">
      <Link href={`/products/${product.category}/${product.id}`}>
        <div className="flex aspect-square items-center justify-center rounded-lg bg-brown-50 p-4">
          <Image
            src={product.image}
            width="auto"
            height="auto"
            className="h-[150px] w-[150px] object-contain lg:h-48 lg:w-48"
            alt={product.name}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-3">
        <Link
          href={`/products/${product.category}/${product.id}`}
          className="transition-colors duration-300 active:text-orange-100 md:hover:text-orange-50"
        >
          <h4 className="font-barlow text-lg font-bold md:text-xl">
            {product.name}
          </h4>
        </Link>
        <p className="text-sm text-black-100">{product.shortDescription}</p>
        <p className="text-xl font-bold text-orange-50 md:text-xxl">
          ${formatCurrency(product.priceCents)}
        </p>
        <Button
          size="md"
          radius="sm"
          className="w-fit"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
