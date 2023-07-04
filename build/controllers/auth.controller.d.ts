import { NextFunction, Request, Response } from "express";
import { userInterface } from "../interfaces/user.interface";
declare const signUp: (res: Response, req: Request) => Promise<void>;
/**
 * This function gets a singleUser with the email and returns the entire data of that user in
 *
 * userInterface forme
 *
 * @param req requset of Email
 * @param res Response payload
 * @param next if any error, use the next function
 */
declare const getSingleUser: (req: Request & userInterface, res: Response, next: NextFunction) => Promise<void>;
declare const fetchUsers: (res: Response, _req: Request) => Promise<Response<any, Record<string, any>>>;
export { signUp, fetchUsers, getSingleUser };
