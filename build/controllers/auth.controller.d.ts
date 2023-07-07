import { NextFunction, Request, Response } from "express";
import { userInterface } from "../interfaces/user.interface";
declare const signUp: (res: Response, req: Request, next: NextFunction) => Promise<void>;
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
declare const updateRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { signUp, fetchUsers, getSingleUser, updateRole };
