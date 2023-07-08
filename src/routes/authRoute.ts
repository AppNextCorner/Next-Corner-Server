require("dotenv").config();
import { NextFunction } from "express";
import express from "express";
const authRouter = express.Router();
import { Request, Response } from "express";
import {
  signUp,
  fetchUsers,
  updateRole,
  getSingleUser,
} from "../controllers/auth.controller";

authRouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    signUp(res, req, next);
  }
);

authRouter.get("/", async (req: Request, res: Response) => {
  fetchUsers(res, req);
});

/**
 * This CRUD operation recieves user and desired role to update
 */
authRouter.put(
  "/switchRoles",
  async (req: Request, res: Response, next: NextFunction) => {
    updateRole(req, res, next);
  }
);

/**
 * This CRUD operation recieves an email and sends back a user
 */
authRouter.post(
  "/getUser",
  async (req: any, res: Response, next: NextFunction) => {
    getSingleUser(req, res, next);
  }
);

export default authRouter;
