require("dotenv").config();
import { Express } from "express";
import express from "express";
const authRouter = express.Router();
import { Request, Response } from "express";
import { signUp, fetchUsers } from "../controllers/auth.controller";

authRouter.post("/signup", signUp);

authRouter.get("/", async (req: Request, res: Response) => {
  fetchUsers(res, req);
  console.log("FEFJWIOEFJE");
});

export { authRouter };
//(res: typeof Response, req: typeof Request)
