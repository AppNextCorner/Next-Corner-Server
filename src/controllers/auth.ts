const { Request, Response } = require("express");
const firebase = require("../util/firebase.util");
const userModel = require("../models/userModel");

const signUp = async (res: typeof Response,req: typeof Request) => {
  try {
    // get user data (1.email 2.password)
    const payload = req.body.firstName;
    // check if another user already has the same email
    const check = await userModel.findOne({ email: payload.email });
    if (check !== null) {
      // return error. 'user with email already exists"
      res.status(400).send({
        message: "User with email already exists",
      });
    } else {
      // create user document using the mondogb schema
      const newUser = await userModel.create({
        email: payload.email,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
      });
      // create new user in firebase
      await firebase.createUser(
        payload.email,
        payload.password,
        // make the UID unique for the user and matches that of the userModel id
        newUser._id.toString()
      );

      res.status(200).send({
        message: "User created successfully",
        payload: newUser,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: e });
  }
};

const fetchUsers = async (res: typeof Response,_req: typeof Request) => {
    const users = await userModel.find();
    console.log(users);
    return res.json(users.map((user: any) => user.toJSON()));
};
export {};
module.exports = {
  signUp,
  fetchUsers,
};
