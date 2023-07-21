/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { reviewInterface } from "../../interfaces/reviews.interface";
/**
 *
 * This function creates a review in the reviews schema
 *
 * @param incomingReview An incoming review in reviewInterface type
 * @returns
 */
declare const createReview: (incomingReview: reviewInterface) => Promise<import("mongoose").Document<unknown, any, {
    user: import("mongoose").Types.ObjectId;
    rating: number;
    review: string;
    idOfItem: string;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    rating: number;
    review: string;
    idOfItem: string;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
/**
 * This function returns all reviews
 * @param selections any selections
 * @returns
 */
declare const findAll: (selections?: any) => Promise<(import("mongoose").Document<unknown, any, {
    user: import("mongoose").Types.ObjectId;
    rating: number;
    review: string;
    idOfItem: string;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    rating: number;
    review: string;
    idOfItem: string;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>)[]>;
/**
 * This function returns reviews[] of a specific itemId
 * @param id Id of the item not the review
 * @param selections any selections
 * @returns
 */
declare const findReviewByItemId: (id: string, selections?: any) => Promise<(import("mongoose").Document<unknown, any, {
    user: import("mongoose").Types.ObjectId;
    rating: number;
    review: string;
    idOfItem: string;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    rating: number;
    review: string;
    idOfItem: string;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>)[]>;
/**
 * This function updates the rating of an item
 * @param id menuItemId
 */
declare const updateItemRating: (itemId: string) => Promise<(import("../../interfaces/store.interface").IBusiness & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
declare const deleteReviewByItemId: (id: string) => Promise<(import("mongoose").Document<unknown, any, {
    user: import("mongoose").Types.ObjectId;
    rating: number;
    review: string;
    idOfItem: string;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    rating: number;
    review: string;
    idOfItem: string;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>) | null>;
export { createReview, findAll, findReviewByItemId, updateItemRating, deleteReviewByItemId };
