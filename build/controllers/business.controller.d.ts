import { NextFunction, Response } from "express";
declare const createCard: (req: any, res: Response, Model: any, savedData: any) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * This function returns vender data (In vendor interface type) when given a name
 *
 * businessName is string
 *
 * @param req Incoming Request
 * @param res Sent Response
 * @param next Next Function
 * @returns
 */
declare const getVendorByName: (req: any, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const uploadStore: (req: any, _res: Response, next: NextFunction) => Promise<void>;
export { createCard, getVendorByName, uploadStore };
