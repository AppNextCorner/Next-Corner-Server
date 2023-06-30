import { Request, Response } from "express";
import { createUser } from "../util/firebase.util";
import { userModel } from "../models/userModel";

const signUp = async (res: Response, req: Request) => {
  try {
    // get user data (1.email 2.password)
    const payload = req.body;
    console.log('payload: ',payload)
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
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: e });
  }
};

const fetchUsers = async (res: Response, _req: Request) => {
  const users = await userModel.find();
  console.log(users);
  return res.json(users.map((user: any) => user.toJSON()));
};
export { signUp, fetchUsers };
