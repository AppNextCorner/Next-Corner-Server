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
import { reviewInterface } from "../../../interfaces/reviews.interface";
declare class ReviewsService {
    model: import("mongoose").Model<{
        user: import("mongoose").Types.ObjectId;
        rating: number;
        review: string;
        idOfItem: string;
    }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").ResolveSchemaOptions<{
        timeStamps: {
            createdAt: string;
        };
        toJSON: {
            virtuals: boolean;
        };
        toObject: {
            virtuals: boolean;
        };
    }>, {
        user: import("mongoose").Types.ObjectId;
        rating: number;
        review: string;
        idOfItem: string;
    }>>;
    private businessModel;
    private sum;
    updateItemRating(vendorId: string, itemId: string): Promise<(import("../../../interfaces/store.interface").IBusiness & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    updateRating(vendorId: string, itemId: string, newRating: number): Promise<(import("../../../interfaces/store.interface").IBusiness & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    createReview(incomingReview: reviewInterface): Promise<import("mongoose").Document<unknown, any, {
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
    findAll(selections?: any): Promise<(import("mongoose").Document<unknown, any, {
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
    findReviewsByItemId(id: string, selections?: any): Promise<(import("mongoose").Document<unknown, any, {
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
    updateItemRatingByItemId(itemId: string): Promise<(import("../../../interfaces/store.interface").IBusiness & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    deleteReviewByItemId(id: string): Promise<(import("mongoose").Document<unknown, any, {
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
}
export default ReviewsService;
