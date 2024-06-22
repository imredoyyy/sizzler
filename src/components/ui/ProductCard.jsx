import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const ProductCard = ({ product }) => {
  return (
    <>
      <div>
        <Link
          href={`/products/${product.category}/${product.id}`}
          key={product.id}
          className="group flex w-[280px] flex-col gap-4 rounded-lg border border-slate-300 p-6 transition-all duration-300 hover:shadow-xl hover:ring-orange-50/60 sm:w-[300px] md:hover:border-orange-100/20 md:hover:bg-brown-50/50"
        >
          <div className="flex justify-center">
            <Image
              src={product.image}
              className="h-52 w-44 object-contain transition-transform duration-300 md:group-hover:scale-105"
              alt={product.name}
              width={"auto"}
              height={"auto"}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-center text-xl font-bold transition-colors duration-300 hover:text-orange-50 md:text-2xl">
              {product.name}
            </div>
            <p className="text-center text-xl font-bold text-orange-50 md:text-xxl">
              ${formatCurrency(product.priceCents)}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
