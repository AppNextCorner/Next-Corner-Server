require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require('express-rate-limit');

// grabbing the routes for the Stripe API 
const stripe = require("./routes/stripeRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
const bearerToken = require('express-bearer-token');
const orderRouter = require("./routes/ordersRoute");
const businessRouter = require("./routes/businessRoute");
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 4020;

async function connectToDb() {
  try {
    // this line of code stop everything until its
    await mongoose.connect(process.env.MONGO_URI)
    console.log('we connected')
  } catch (error) {
    console.log(error)
    // add handler to deal with db connection error
  }
}
// run the function to connect
connectToDb()

app.use(express.static('images'));
app.use(express.json());
app.use(bodyParser.json());
// Allow transfer of data
app.use(cors());
app.use(bearerToken()); // Be able to access the token in our backend


// setting routes for stripe
app.use('/', stripe)
// routes for cart
app.use('/api', cartRouter)
// routes fo auth
app.use('/auth', authRouter)
// routes for orders
app.use('/orders', orderRouter);
// routes for business side 
app.use('/business', businessRouter)
// const hostname = '192.168.1.24'
app.listen(PORT, () => console.log(`Server running at PORT`));