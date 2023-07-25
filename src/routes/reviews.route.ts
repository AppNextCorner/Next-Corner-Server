import { NextFunction, Request, Response, Router } from "express";
import ReviewsController from "../controllers/reviews.controller";

const reviewsRouter = Router();
const controller = new ReviewsController();
reviewsRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    controller.createReview(req, res, next);
  }
);

reviewsRouter.get(
  "/getReviews/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    controller.getReviews(req, res, next);
  }
);

export default reviewsRouter;
