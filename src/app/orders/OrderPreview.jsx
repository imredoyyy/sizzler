import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrderPreview = ({ product }) => {
  return (
    <>
      <div className="flex w-full items-center gap-4 rounded-lg border border-orange-50 p-4">
        <div className="flex w-full justify-center">
          <div className="grid size-[110px] place-items-center rounded-lg bg-slate-300 p-1">
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
              <h2 className="text-lg font-bold md:text-2xl">{product.name}</h2>
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
                  {product.extras.map((extra) => extra).join(", ")}
                </span>
              </p>
            )}
            <h3 className="font-bold text-orange-50 md:text-xxl">
              ${formatCurrency(product.priceCents)}
            </h3>
          </div>

          <p className="">Quantity: {product.quantity}</p>
        </div>
      </div>
    </>
  );
};

export default OrderPreview;
