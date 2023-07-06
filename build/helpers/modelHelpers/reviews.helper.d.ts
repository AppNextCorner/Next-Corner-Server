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
    rating: number;
    user: import("mongoose").Types.ObjectId;
    review: string;
    idOfItem: string;
}> & Omit<{
    rating: number;
    user: import("mongoose").Types.ObjectId;
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
    rating: number;
    user: import("mongoose").Types.ObjectId;
    review: string;
    idOfItem: string;
}> & Omit<{
    rating: number;
    user: import("mongoose").Types.ObjectId;
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
    rating: number;
    user: import("mongoose").Types.ObjectId;
    review: string;
    idOfItem: string;
}> & Omit<{
    rating: number;
    user: import("mongoose").Types.ObjectId;
    review: string;
    idOfItem: string;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>)[]>;
/**
 * This function updates the rating of an item
 * @param id menuItemId
 */
declare const updateItemRating: (id: string) => Promise<(import("mongoose").Document<unknown, any, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string[];
    announcements: import("mongoose").Types.DocumentArray<{
        image: string[];
        description?: string | undefined;
        color?: string | undefined;
        header?: string | undefined;
    }>;
    categories: import("mongoose").Types.DocumentArray<{
        category?: string | undefined;
    }>;
    menu: import("mongoose").Types.DocumentArray<{
        image: string[];
        customizations: import("mongoose").Types.DocumentArray<{
            optionCustomizations: import("mongoose").Types.DocumentArray<{
                label?: string | undefined;
                selected?: boolean | undefined;
                optionId?: string | undefined;
            }>;
            type?: string | undefined;
            name?: string | undefined;
        }>;
        name?: string | undefined;
        time?: number | undefined;
        price?: number | undefined;
        description?: string | undefined;
        amountInCart?: number | undefined;
        category?: string | undefined;
        rating?: number | undefined;
        featured?: boolean | undefined;
    }>;
    close?: string | undefined;
    name?: string | undefined;
    userId?: string | undefined;
    location?: any;
    rating?: number | undefined;
    status?: {
        text?: string | undefined;
        color?: string | undefined;
    } | undefined;
    open?: string | undefined;
    categoryId?: number | undefined;
    trending?: string | undefined;
}> & Omit<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string[];
    announcements: import("mongoose").Types.DocumentArray<{
        image: string[];
        description?: string | undefined;
        color?: string | undefined;
        header?: string | undefined;
    }>;
    categories: import("mongoose").Types.DocumentArray<{
        category?: string | undefined;
    }>;
    menu: import("mongoose").Types.DocumentArray<{
        image: string[];
        customizations: import("mongoose").Types.DocumentArray<{
            optionCustomizations: import("mongoose").Types.DocumentArray<{
                label?: string | undefined;
                selected?: boolean | undefined;
                optionId?: string | undefined;
            }>;
            type?: string | undefined;
            name?: string | undefined;
        }>;
        name?: string | undefined;
        time?: number | undefined;
        price?: number | undefined;
        description?: string | undefined;
        amountInCart?: number | undefined;
        category?: string | undefined;
        rating?: number | undefined;
        featured?: boolean | undefined;
    }>;
    close?: string | undefined;
    name?: string | undefined;
    userId?: string | undefined;
    location?: any;
    rating?: number | undefined;
    status?: {
        text?: string | undefined;
        color?: string | undefined;
    } | undefined;
    open?: string | undefined;
    categoryId?: number | undefined;
    trending?: string | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>) | null>;
export { createReview, findAll, findReviewByItemId, updateItemRating };
