import { Request, Response, NextFunction } from "express";
import ReviewsService from "../helpers/modelHelpers/reviews/reviews.service";
import * as userHelper from "../helpers/modelHelpers/user.helper";

export default class ReviewsController{
  private reviewsService = new ReviewsService();
  /**
 *
 * This method creates the review using the review interface
 *
 * @param req Incoming request
 * @param res Sent Response
 * @param next Next function
 */
public  createReview = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    // Let the reviewsService function handle the create review
    this.reviewsService.createReview(req.body);

    // Update the item Rating
    this.reviewsService.updateItemRating(req.body.idOfItem.toString());
  } catch (err) {
    next(err);
  }
};

/**
 * This method gets the reviews and sends them back to the front end in arrays of reviewInterface[] and UserInterface[]
 * @param req Incoming Request
 * @param res Sent response
 * @param next  Next function
 *
 * req.params.id = idOfTheItem
 */
public getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews: any = await this.reviewsService.findReviewsByItemId(req.params.id); // Use the helper function to find the reviews with itemId
    console.log(reviews);
    await this.reviewsService.updateItemRating(req.params.id);

    // Incase comments are over flooding, delete all
    // await new Promise(() =>
    //   reviews.array.forEach((element: any) => {
    //     helper.deleteReviewByItemId(element._id.toString());
    //   })
    // );
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
}


