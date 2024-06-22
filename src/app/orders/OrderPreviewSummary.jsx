import { formatCurrency } from "@/lib/utils";
import React from "react";

const OrderPreviewSummary = ({ products = [], totalQuantity }) => {
  const totalAmount = () => {
    let totalWithoutTaxCents = 0;
    let deliveryFee = 0;

    products.forEach((product) => {
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
  return (
    <div className="h-fit rounded-md border border-orange-100 px-3 py-5">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold text-orange-50 lg:text-xl">
          Order Summary
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 border-b border-slate-300 pb-2">
            <div className="flex items-center justify-between">
              <div>Items ({totalQuantity}):</div>
              <div>${totalAmount().totalWithoutTax}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Total Without Tax:</div>
              <div>${totalAmount().totalWithoutTax}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Estimated Tax:</div>
              <div>${totalAmount().totalTax}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Delivery Fee:</div>
              <div>${formatCurrency(totalAmount().deliveryFee)}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="font-bold text-orange-50">Subtotal:</div>
            <div className="font-bold text-orange-50">
              ${totalAmount().subtotal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPreviewSummary;
