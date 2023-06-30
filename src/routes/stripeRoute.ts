require("dotenv").config();
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const { Request, Response, Next } = require("express");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.use("/stripe", express.raw({ type: "*/*" }));

interface IClientData {
  amount: string,
  name: string
}
router.post("/payment", async (req: typeof Request, res: typeof Response) => {
  //
  try {
    const merchantDisplayName = req.headers["merchantdisplayname"];
    console.log(merchantDisplayName)
    // Getting data from client
    const { amount, name }: IClientData = req.body;
    // Simple validation
    if (!amount || !name || !merchantDisplayName)
      return res.status(400).json({ message: "All fields are required" });
    const parsedAmount: number = parseInt(amount);

    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-11-15" }
    );
    // const session = await stripe.checkout.sessions.create({
    //   submit_type: 'donate',
    //   payment_method_types: ['card'],
    //   line_items: [{
    //     price: '{{PRICE_ID}}',
    //     quantity: 1,
    //   }],
    //   mode: 'payment',
    //   success_url: 'https://example.com/success',
    //   cancel_url: 'https://example.com/cancel',
    // });
    // Initiate payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parsedAmount * 100),
      currency: "USD",
      payment_method_types: ["card"],
      setup_future_usage: "off_session",
      metadata: { name },
    });
    // Extracting the client secret
    const clientSecret = paymentIntent.client_secret;
    console.log(clientSecret);
    // Sending the client secret as response
    res.json({
      message: "payment in progress",
      client_secret: clientSecret,
      customer: customer.id,
      ephemeralKey: ephemeralKey.secret,
    });
  } catch (err) {
    // Catch any error and send error 500 to client
    console.error(err);
    console.log("error in payment: ", err);
    res.status(500).json(err);
  }
});

router.get("/secret", async (req: typeof Request, res: typeof Response) => {
  const { amount, name }: IClientData = req.body;
  const parsedAmount: number = parseInt(amount);
  const paymentIntent = await stripe.paymentIntents.find({
    amount: Math.round(parsedAmount * 100),
    currency: "USD",
    payment_method_types: ["card"],
    metadata: { name },
  });
  const intent = paymentIntent;
  res.json({ client_secret: intent.client_secret });
});

// Webhook endpoint
router.post("/stripe", async (req: typeof Request, res: typeof Response) => {
  // Get the signature from the headers
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // Check if the event is sent from Stripe or a third party
    // And parse the event
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    // Handle what happens if the event is not from Stripe
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
});

export {}
module.exports = router;