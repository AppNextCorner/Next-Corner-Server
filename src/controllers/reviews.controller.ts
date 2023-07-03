import { Request, Response, NextFunction } from "express";
import { findAllVendors } from "../helpers/modelHelpers/businessModelHelpers/business.helper";
import * as helper from "../helpers/modelHelpers/reviews.helper";
import * as userHelper from "../helpers/modelHelpers/user.helper";
import { userInterface } from "../interfaces/user.interface";

/**
 *
 * This function creates the review using the review interface
 *
 * @param req Incoming request
 * @param res Sent Response
 * @param next Next function
 */
const createReview = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // Let the helper function handle the create review
    helper.createReview(req.body);
  } catch (err) {
    next(err);
  }
};

/**
 * This function gets the reviews and sends them back to the front end in arrays of reviewInterface[] and UserInterface[]
 * @param req Incoming Request
 * @param res Sent response
 * @param next  Next function
 */
const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews: any = await helper.findReviewByItemId(req.params.id); // Use the helper function to find the reviews with itemId
    const usersList: any = await Promise.all(
      // Map through the reviews and get the userId,
      reviews.map(async (review: any) => {
        const user = await userHelper.findById(review.user.toString()); // use that userId to find a user with that Id
        return user; // Return the user
      })
    );

    res.status(200).send({
      payload: reviews, // Send the reviews[] as payload
      users: usersList, // send the users[] who made the review as users
      message: "Reviews found!",
    });
  } catch (err) {
    next(err);
  }
};
export { createReview, getReviews };
