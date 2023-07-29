import { Request, Response, NextFunction } from "express";
export default class ReviewsController {
    private reviewsService;
    private trendingService;
    /**
     *
     * This method creates the review using the review interface
     *
     * @param req Incoming request
     * @param res Sent Response
     * @param next Next function
     */
    createReview: (req: Request, _res: Response, next: NextFunction) => Promise<void>;
    /**
     * This method gets the reviews and sends them back to the front end in arrays of reviewInterface[] and UserInterface[]
     * @param req Incoming Request
     * @param res Sent response
     * @param next  Next function
     *
     * req.params.id = idOfTheItem
     */
    getReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
