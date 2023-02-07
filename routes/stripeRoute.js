require("dotenv").config();
const express = require('express')
const router = express.Router()
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.use("/stripe", express.raw({ type: "*/*" }));

router.post("/payment", async (req, res) => {
    
    try {
      // Getting data from client
      let { amount, name } = req.body;
      // Simple validation
      if (!amount || !name)
        return res.status(400).json({ message: "All fields are required" });
      amount = parseInt(amount);
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
        amount: Math.round(amount * 100),
        currency: "USD",
        payment_method_types: ["card"],
        metadata: { name },
      });
      // Extracting the client secret
      const clientSecret = paymentIntent.client_secret;
      console.log(clientSecret);
      // Sending the client secret as response
      res.json({message: "payment in progress", client_secret: clientSecret});
    } catch (err) {
      // Catch any error and send error 500 to client
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  router.get('/secret', async (req, res) => {
      
      const paymentIntent = await stripe.paymentIntents.find({
          amount: Math.round(amount * 100),
          currency: "USD",
          payment_method_types: ["card"],
          metadata: { name },
        });
      const intent = paymentIntent
      res.json({client_secret: intent.client_secret});
    });
  
  // Webhook endpoint
  router.post("/stripe", async (req, res) => {
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
    } catch (err) {
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

  module.exports = router