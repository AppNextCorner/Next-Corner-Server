require('dotenv').config()
const express = require('express')
const orderRouter = express.Router()
// const decodeIDToken = require('../authenticateToken')
const Orders = require('../models/orderModel')
const firebase = require('../util/firebase')

async function decodeIDToken(req, res, next) {
  console.log('Token Request', req.token)
  if (req.token) {
    try {
      const decodedToken = await firebase.verifyToken(req.token)
      req['currentUser'] = decodedToken
      next()
    } catch (err) {
      console.log(err)
    }
  }
}

orderRouter.post('/', decodeIDToken, async (req, res) => {
  const auth = req.currentUser
  console.log(req)
  if (auth) {
    try {
      const order = new Orders(req.body)
      const saveOrder = await order.save()
      console.log(saveOrder)
      return res.status(201).json(saveOrder)
    } catch (error) {
      console.log(error)
    }
  } else {
    return res.status(403).send('Not authorized')
  }
})

orderRouter.get('/', decodeIDToken, async (req, res) => {
  const auth = req.currentUser
  //console.log("Auth: ", req)
  if (auth) {
    const orders = await Orders.find({})
    console.log(orders)
    return res.json(orders.map((order) => order.toJSON()))
  } else {
    return res.status(403).send('Not authorized')
  }
})
orderRouter.patch('/order-status/:id', (req, res) => {
    // grab the new score info
    const data = req.body
    const auth = req.currentUser
    //const id = parseInt(req.query.id)
    //const mapScore = Cart.map(val => val.cartData)
  
    // create a new score in the database
    async function updateStatus() {
      try {
        console.log(req.currentUser)
        console.log(req.params.id)
        console.log(req.body)
  
        const newStatus = await Orders.findOneAndUpdate(
          { _id: req.params.id },
          {
            orderStatus: data.status,
          },
        )
        console.log(newStatus)
        // grab _id from body -> then add what data to update
        return res.status(201).send(newStatus)
      } catch (err) {
        res.status(403).send(err.message)
      }
    }
    // if (auth) {
    updateStatus()
    // } else {
    //   return res.status(403).send('Not authorized')
    // }
  })

// // Update ONE document score with an ID and data that wants to be updated
// orderRouter.put('/item-amount/:id', (req, res) => {
//   // grab the new score info
//   const data = req.body
//   const auth = req.currentUser
//   //const id = parseInt(req.query.id)
//   //const mapScore = Cart.map(val => val.cartData)

//   // create a new score in the database
//   async function updateScore() {
//     try {
//       console.log(req.params.id)
//       console.log(req.body)

//       const newScore = await Cart.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           'cartData.amountInCart': data.amountInCart,
//         },
//       )
//       console.log(newScore)
//       // grab _id from body -> then add what data to update
//       return res.status(201).send(newScore)
//     } catch (err) {
//       res.status(403).send(err.message)
//     }
//   }
//   // if (auth) {
//   updateScore()
//   // } else {
//   //   return res.status(403).send('Not authorized')
//   // }
// })

// // deleting ONE item document from leaderboard from an ID
// orderRouter.delete("/delete-item/:id", (req, res) => {

//   async function deleteItem() {
//     try {
//       // find the document with the ID input on an API for it to perform the delete action with .findByIdAndDelete
//       const deletedUserItem = await Cart.findByIdAndDelete(
//         // accessing the item's ID 
//         { _id: req.params.id }
//       );
//       // send back score data and status ok
//       res.status(201).send({
//         message: `Deleted Item`,
//         payload: deletedUserItem,
//       });
//     } catch (e) {
//       console.log(e);
//       // send back error mesage
//       res.status(400).send({
//         message: "error happened",
//         data: e,
//       });
//     }
//   }

//   deleteItem();
// });


module.exports = orderRouter
