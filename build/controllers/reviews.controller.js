"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviews_service_1 = __importDefault(require("../helpers/modelHelpers/reviews/reviews.service"));
const userHelper = __importStar(require("../helpers/modelHelpers/user.helper"));
const trending_service_1 = __importDefault(require("../helpers/modelHelpers/businessModelHelpers/trending.service"));
class ReviewsController {
    constructor() {
        this.reviewsService = new reviews_service_1.default();
        this.trendingService = new trending_service_1.default();
        /**
         *
         * This method creates the review using the review interface
         *
         * @param req Incoming request
         * @param res Sent Response
         * @param next Next function
         */
        this.createReview = (req, _res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Let the reviewsService function handle the create review
                this.reviewsService.createReview(req.body);
                // Update the item Rating
                this.reviewsService.updateItemRatingByItemId(req.body.idOfItem.toString());
                yield this.trendingService.updateVendorRating(req.body.idOfItem);
                yield this.trendingService.setBestReviews();
            }
            catch (err) {
                next(err);
            }
        });
        /**
         * This method gets the reviews and sends them back to the front end in arrays of reviewInterface[] and UserInterface[]
         * @param req Incoming Request
         * @param res Sent response
         * @param next  Next function
         *
         * req.params.id = idOfTheItem
         */
        this.getReviews = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield this.reviewsService.findReviewsByItemId(req.params.id); // Use the helper function to find the reviews with itemId
                console.log(reviews);
                yield this.reviewsService.updateItemRatingByItemId(req.params.id);
                // Incase comments are over flooding, delete all
                // await new Promise(() =>
                //   reviews.array.forEach((element: any) => {
                //     helper.deleteReviewByItemId(element._id.toString());
                //   })
                // );
                const usersList = yield Promise.all(
                // Map through the reviews and get the userId,
                reviews.map((review) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield userHelper.findById(review.user.toString()); // use that userId to find a user with that Id
                    return user; // Return the user
                })));
                res.status(200).send({
                    payload: reviews,
                    users: usersList,
                    message: "Reviews found!",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ReviewsController;
