require("dotenv").config();
import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

// grabbing the routes for the Stripe API
import stripe from "./routes/stripeRoute";
import cartRouter from "./routes/cartRoute";
import authRouter from "./routes/authRoute";
import bearerToken from "express-bearer-token";
import orderRouter from "./routes/ordersRoute";
import businessRouter from "./routes/businessRoute";
import reviewsRouter from "./routes/reviews.route";
import bodyParser from "body-parser";

import { error } from "console";

const PORT = process.env.PORT || 4020;

async function connectToDb() {
  try {
    if (process.env.MONGO_URI)
      // this line of code stop everything until its
      await mongoose.connect(process.env.MONGO_URI);
    else throw error;
    console.log("we connected");
  } catch (error) {
    console.log(error);
    // add handler to deal with db connection error
  }
}
// run the function to connect
connectToDb();

app.use(express.static("images"));
app.use(express.json());
app.use(bodyParser.json());
// Allow transfer of data
app.use(cors());
app.use(bearerToken()); // Be able to access the token in our backend

// setting routes for stripe
app.use("/", stripe);
// routes for cart
app.use("/api", cartRouter);
// routes fo auth
app.use("/auth", authRouter);
// routes for orders
app.use("/orders", orderRouter);
// routes for business side
app.use("/business", businessRouter);
// routes for the reviews
app.use("/reviews", reviewsRouter);
// const hostname = '192.168.1.24'
app.listen(PORT, () => console.log(`Server running at PORT`));
