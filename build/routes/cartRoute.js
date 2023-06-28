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
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const { Request, Response, Next } = require("express");
const cartRouter = express.Router();
// const decodeIDToken = require('../authenticateToken')
const Cart = require('../models/cartModel');
const firebase = require('../util/firebase.util');
function decodeIDToken(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Token Request', req.token);
        if (req.token) {
            try {
                const decodedToken = yield firebase.verifyToken(req.token);
                req['currentUser'] = decodedToken;
                next();
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
cartRouter.post('/', decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    if (auth) {
        try {
            const cart = new Cart(req.body);
            const savedCart = yield cart.save();
            console.log(savedCart);
            return res.status(201).json(savedCart);
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(403).send('Not authorized');
    }
}));
cartRouter.get('/', decodeIDToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.currentUser;
    console.log('Auth: ', req.currentUser);
    if (auth) {
        const cart = yield Cart.find({});
        console.log("cart:", cart);
        return res.json(cart.map((cart) => cart.toJSON()));
    }
    else {
        return res.status(403).send('Not authorized');
    }
}));
// Update ONE document score with an ID and data that wants to be updated
cartRouter.put('/item-amount/:id', (req, res) => {
    // grab the new score info
    const data = req.body;
    const auth = req.currentUser;
    //const id = parseInt(req.query.id)
    //const mapScore = Cart.map(val => val.cartData)
    // create a new score in the database
    function updateScore() {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //   console.log(req.params.id)
            //   console.log(req.body)
            //   const newScore = await Cart.findOneAndUpdate(
            //     { _id: req.params.id },
            //     {
            //       'cartData.amountInCart': data.amountInCart,
            //     },
            //   )
            //   console.log(newScore)
            //   // grab _id from body -> then add what data to update
            //   return res.status(201).send(newScore)
            // } catch (err) {
            //   res.status(403).send(err.message)
            // }
            try {
                const updatedProduct = yield Cart.findOneAndUpdate({ _id: req.params.id }, {
                    $set: {
                        'cartData.amountInCart': data.amountInCart,
                    },
                });
                res.status(200).send(updatedProduct);
                console.log(updatedProduct);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        });
    }
    // if (auth) {
    updateScore();
    // } else {
    //   return res.status(403).send('Not authorized')
    // }
});
// deleting ONE item document from leaderboard from an ID
cartRouter.delete('/delete-item/:id', (req, res) => {
    function deleteItem() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // find the document with the ID input on an API for it to perform the delete action with .findByIdAndDelete
                const deletedUserItem = yield Cart.findByIdAndDelete(
                // accessing the item's ID
                { _id: req.params.id });
                // send back score data and status ok
                res.status(201).send({
                    message: `Deleted Item`,
                    payload: deletedUserItem,
                });
            }
            catch (e) {
                console.log(e);
                // send back error mesage
                res.status(400).send({
                    message: 'error happened',
                    data: e,
                });
            }
        });
    }
    deleteItem();
});
module.exports = cartRouter;
