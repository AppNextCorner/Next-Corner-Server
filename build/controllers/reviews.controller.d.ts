import { Request, Response, NextFunction } from "express";
/**
 *
 * This function creates the review using the review interface
 *
 * @param req Incoming request
 * @param res Sent Response
 * @param next Next function
 */
declare const createReview: (req: Request, _res: Response, next: NextFunction) => Promise<void>;
/**
 * This function gets the reviews and sends them back to the front end in arrays of reviewInterface[] and UserInterface[]
 * @param req Incoming Request
 * @param res Sent response
 * @param next  Next function
 *
 * req.params.id = idOfTheItem
 */
declare const getReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { createReview, getReviews };
