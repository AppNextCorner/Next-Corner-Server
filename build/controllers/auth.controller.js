"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateRole = exports.getSingleUser = exports.fetchUsers = exports.signUp = void 0;
const firebase_util_1 = require("../util/firebase.util");
const userModel_1 = require("../models/userModel");
const user = __importStar(require("../helpers/modelHelpers/user.helper"));
const signUp = (res, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get user data (1.email 2.password)
        const payload = req.body;
        // check if another user already has the same email
        const check = yield userModel_1.userModel.findOne({ email: payload.email });
        if (check !== null) {
            // return error: 'user with email already exists'
            res.status(400).send({
                message: "User with email already exists",
            });
        }
        else {
            // create user document using the MongoDB schema
            const newUser = yield userModel_1.userModel.create({
                email: payload.email,
                password: payload.password,
                firstName: payload.firstName,
                lastName: payload.lastName,
                phoneNumber: payload.phoneNumber,
            });
            try {
                // create new user in Firebase
                yield (0, firebase_util_1.createUser)(payload.email, payload.password, 
                // make the UID unique for the user and matches that of the userModel id
                newUser._id.toString());
                res.status(200).send({
                    message: "User created successfully",
                    payload: newUser,
                });
            }
            catch (error) {
                // Handle the Firebase error
                console.error("Firebase user creation error:", error);
                // Delete the user document in MongoDB if Firebase user creation fails
                yield userModel_1.userModel.deleteOne({ _id: newUser._id });
                res.status(400).send({
                    message: error.message,
                    payload: error,
                });
                // Pass the error to the error-handling middleware
                next(error);
            }
        }
    }
    catch (error) {
        // Handle other errors
        console.error("An error occurred:", error);
        res.status(400).send({
            message: "Missing Credentials",
            payload: error,
        });
        // Pass the error to the error-handling middleware
        next(error);
    }
});
exports.signUp = signUp;
/**
 * This function gets a singleUser with the email and returns the entire data of that user in
 *
 * userInterface forme
 *
 * @param req requset of Email
 * @param res Response payload
 * @param next if any error, use the next function
 */
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // deconstruct the req.body
        const data = req.body;
        // findByEmail is given the data.email param
        const payload = yield user.findByEmail(data.email);
        // send barck the the user data in the forme of userInterface
        res.status(200).send({
            payload: payload,
            message: "User data sent!",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleUser = getSingleUser;
const fetchUsers = (res, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.userModel.find();
    // console.log("USERS" + users);
    return res.json(users.map((user) => user.toJSON()));
});
exports.fetchUsers = fetchUsers;
const updateRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newUser = yield user.updateRoleByUserId(data.userId, data.role);
        res.status(200).send({
            message: "User is updated!",
            payload: newUser,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateRole = updateRole;
