require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require('express-rate-limit');
const requestIp = require('request-ip'); // Don't want to block all requests for all users


// grabbing the routes for the Stripe API 
const stripe = require("./routes/stripeRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
const bearerToken = require('express-bearer-token');
const orderRouter = require("./routes/ordersRoute");
const businessRouter = require("./routes/businessRoute");
const bodyParser = require('body-parser')
//const decodeIDToken = require('./authenticateToken');

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

app.use(requestIp.mw());

app.use(rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50, // limit each IP to 30 requests per windowMs
  keyGenerator: (req, res) => {
    return req.clientIp // IP address from requestIp.mw(), as opposed to req.ip
  }
}));
app.use(express.static('images'));
app.use(express.json());
app.use(bodyParser.json());
// Allow transfer of data
app.use(cors({ origin: true }));
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));