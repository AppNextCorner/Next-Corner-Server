"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const stripe_1 = __importDefault(require("stripe"));
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeSecretWebhook = process.env.STRIPE_WEBHOOK__SECRET;
const stripe = new stripe_1.default(stripeSecretKey, {
    apiVersion: "2022-11-15",
});
router.use("/stripe", express_1.default.raw({ type: "*/*" }));
router.post("/payment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
    try {
        const merchantDisplayName = req.headers["merchantdisplayname"];
        console.log(merchantDisplayName);
        // Getting data from client
        const { amount, name } = req.body;
        // Simple validation
        if (!amount || !name || !merchantDisplayName)
            return res.status(400).json({ message: "All fields are required" });
        const parsedAmount = parseInt(amount);
        const customer = yield stripe.customers.create();
        const ephemeralKey = yield stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: "2022-11-15" });
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
        const paymentIntent = yield stripe.paymentIntents.create({
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
    }
    catch (err) {
        // Catch any error and send error 500 to client
        console.error(err);
        console.log("error in payment: ", err);
        res.status(500).json(err);
    }
}));
router.get("/secret", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, name } = req.body;
    const parsedAmount = parseInt(amount);
    /**
     * FOR LATER
     */
    // const paymentIntent = await stripe.paymentIntents.retrieve({
    //   amount: Math.round(parsedAmount * 100),
    //   currency: "USD",
    //   payment_method_types: ["card"],
    //   metadata: { name },
    // });
    // const intent = paymentIntent;
    // res.json({ client_secret: intent.client_secret });
}));
// Webhook endpoint
router.post("/stripe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the signature from the headers
    const sig = req.headers["stripe-signature"];
    if (sig) {
        let event;
        try {
            // Check if the event is sent from Stripe or a third party
            // And parse the event
            event = yield stripe.webhooks.constructEvent(req.body, sig, stripeSecretWebhook);
        }
        catch (err) {
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
    }
}));
exports.default = router;
