require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// grabbing the routes for the Stripe API 
const stripe = require("./routes/stripeRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
const bearerToken = require('express-bearer-token');
const orderRouter = require("./routes/ordersRoute");
//const decodeIDToken = require('./authenticateToken');

const PORT = process.env.PORT || 4020;

async function connectToDb() {
  try {
    // this line of code stop everything until its
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      
      useUnifiedTopology: true,
    })
    console.log('we connected')
  } catch (error) {
    console.log(error)
    // add handler to deal with db connection error
  }
}
// run the function to connect
connectToDb()



app.use(express.json());
app.use(cors({ origin: true }));
app.use(bearerToken());

// app.use(decodeIDToken)
// setting routes for stripe
app.use('/', stripe)
// routes for cart
app.use('/api', cartRouter)
// routes fo auth
app.use('/auth', authRouter)
// routes for orders
app.use('/orders', orderRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));