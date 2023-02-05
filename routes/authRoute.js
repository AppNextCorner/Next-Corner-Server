require('dotenv').config()

const express = require('express')
const authRouter = express.Router()
const firebase = require('../util/firebase')
const userModel = require('../models/userModel')

authRouter.post('/signup', async (req, res) => {
  try {
    // get user data (1.email 2.password)
    const payload = req.body

    // check if another user already has the same email
    const check = await userModel.findOne({ email: payload.email })
    if (check !== null) {
      // return error. 'user with email already exists"
      res.status(400).send({
        message: 'User with email already exists'
      })
    }else{
    // create user document using the mondogb schema
    const newUser = await userModel.create({
        email: payload.email,
        password: payload.password,
        name: payload.name,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber
      })
  
      // create new user in firebase
      await firebase.createUser(
        payload.email,
        payload.password,
        // make the UID unique for the user and matches that of the userModel id
        newUser._id.toString(),
      )

      res.status(200).send({
        message: 'User created successfully',
        payload: newUser
      })
    }


  } catch (e) {}
})

authRouter.get('/', async (req, res) => {
    const users = await userModel.find({})
    console.log(users)
    return res.json(users.map((users) => users.toJSON()))
})

module.exports = authRouter
