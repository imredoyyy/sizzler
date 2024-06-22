import { Order } from "@/models/Order";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const request = await req.text();
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    event = stripe.webhooks.constructEvent(request, sig, stripeWebhookSecret);
  } catch (e) {
    console.error(e);
    return Response.json(e, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    console.log(event);
    const orderId = event?.data?.object?.metadata?.orderId;
    console.log("orderId", orderId);
    const isPaid = event?.data?.object?.payment_status === "paid";
    console.log("isPaid", isPaid);
    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
      console.log("paid");
    }
  }

  return Response.json("ok", { status: 200 });
}
