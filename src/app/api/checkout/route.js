import { AuthOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  try {
    // Connect to the database if not already connected
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    const { cartProducts } = await req.json();

    if (!cartProducts || cartProducts.length === 0) {
      return Response.json(
        { error: "No products in the cart" },
        { status: 400 },
      );
    }

    const session = await getServerSession(AuthOptions);
    if (!session) {
      return Response.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const userEmail = session?.user?.email;

    const orderData = await Order.create({
      userEmail,
      products: cartProducts,
      paid: false,
    });

    let totalPrice = 0;
    // Calculate total price before tax
    cartProducts.forEach((product) => {
      totalPrice += product.priceCents * product.quantity;
    });
    console.log("Total Amount", totalPrice);

    const shippingAmount = totalPrice >= 5000 ? 0 : 500;
    console.log("Shipping Amount", shippingAmount);

    const stripeLineItems = cartProducts.map((product) => {
      const productTotalPriceCents = product.priceCents;
      const productTotalPriceWithTaxCents = Math.round(
        productTotalPriceCents * 1.1,
      );

      console.log(
        "Product Total Price With Tax",
        productTotalPriceWithTaxCents,
      );

      return {
        quantity: product.quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: productTotalPriceWithTaxCents,
        },
      };
    });

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: userEmail,
      success_url: `${process.env.NEXTAUTH_URL}/orders/${orderData._id.toString()}?clearCart=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart?canceled=true`,
      metadata: { orderId: orderData._id.toString() },
      payment_intent_data: {
        metadata: { orderId: orderData._id.toString() },
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: {
              amount: shippingAmount,
              currency: "USD",
            },
          },
        },
      ],
    });

    return Response.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error in checkout process:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
