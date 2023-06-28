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
const { Request, Response } = require("express");
const firebase = require("../util/firebase.util");
const userModel = require("../models/userModel");
const signUp = (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get user data (1.email 2.password)
        const payload = req.body;
        console.log('payload: ', payload);
        // check if another user already has the same email
        const check = yield userModel.findOne({ email: payload.email });
        if (check !== null) {
            // return error. 'user with email already exists"
            res.status(400).send({
                message: "User with email already exists",
            });
        }
        else {
            // create user document using the mondogb schema
            const newUser = yield userModel.create({
                email: payload.email,
                password: payload.password,
                firstName: payload.firstName,
                lastName: payload.lastName,
                phoneNumber: payload.phoneNumber,
            });
            // create new user in firebase
            yield firebase.createUser(payload.email, payload.password, 
            // make the UID unique for the user and matches that of the userModel id
            newUser._id.toString());
            res.status(200).send({
                message: "User created successfully",
                payload: newUser,
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(401).send({ message: e });
    }
});
const fetchUsers = (res, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel.find();
    console.log(users);
    return res.json(users.map((user) => user.toJSON()));
});
module.exports = {
    signUp,
    fetchUsers,
};
