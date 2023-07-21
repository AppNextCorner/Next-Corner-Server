import { NextFunction, Request, Response } from "express";
import { createUser } from "../util/firebase.util";
import { userModel } from "../models/userModel";
import * as user from "../helpers/modelHelpers/user.helper";
import { userInterface } from "../interfaces/user.interface";

const signUp = async (res: Response, req: Request, next: NextFunction) => {
  try {
    // get user data (1.email 2.password)
    const payload = req.body;
    // check if another user already has the same email
    const check = await userModel.findOne({ email: payload.email });
    if (check !== null) {
      // return error: 'user with email already exists'
      res.status(400).send({
        message: "User with email already exists",
      });
    } else {
      // create user document using the MongoDB schema
      const newUser = await userModel.create({
        email: payload.email.toLowerCase(),
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
      });
      try {
        // create new user in Firebase
        await createUser(
          payload.email,
          payload.password,
          // make the UID unique for the user and matches that of the userModel id
          newUser._id.toString()
        );
        res.status(200).send({
          message: "User created successfully",
          payload: newUser,
        });
      } catch (error: any) {
        // Handle the Firebase error
        console.error("Firebase user creation error:", error);

        // Delete the user document in MongoDB if Firebase user creation fails
        await userModel.deleteOne({ _id: newUser._id });

        res.status(400).send({
          message: error.message,
          payload: error,
        });
        // Pass the error to the error-handling middleware
        next(error);
      }
    }
  } catch (error) {
    // Handle other errors
    console.error("An error occurred:", error);
    res.status(400).send({
      message: "Missing Credentials",
      payload: error,
    });
    // Pass the error to the error-handling middleware
    next(error);
  }
};

/**
 * This function gets a singleUser with the email and returns the entire data of that user in
 *
 * userInterface forme
 *
 * @param req requset of Email
 * @param res Response payload
 * @param next if any error, use the next function
 */
const getSingleUser = async (
  req: Request & userInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    // deconstruct the req.body
    const data = req.body;

    // findByEmail is given the data.email param
    const payload = await user.findByEmail(data.email);

    // send barck the the user data in the forme of userInterface
    res.status(200).send({
      payload: payload,
      message: "User data sent!",
    });
  } catch (err) {
    next(err);
  }
};

const fetchUsers = async (res: Response, _req: Request) => {
  const users = await userModel.find();
  // console.log("USERS" + users);
  return res.json(users.map((user: any) => user.toJSON()));
};




/**
 * This function updates the role of the user based on the role given
 */
const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    // data,userId = userId
    // data.role = desired role

    const newUser = await user.updateRoleByUserId(data.userId, data.role);

    res.status(200).send({
      message: "User is updated!",
      payload: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export { signUp, fetchUsers, getSingleUser, updateRole };
