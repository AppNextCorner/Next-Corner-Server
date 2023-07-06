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
/**
 * This function returns all items
 * @param selections Any selections
 * @returns
 */
declare const findAllItems: (selections?: any) => Promise<(import("mongoose").Document<unknown, any, {
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
}> & Omit<{
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
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>)[]>;
/**
 * This function updates the rating of an item by using the itemId and vendorId
 * @param vendorId the id of the vendor
 * @param itemId  the id of the menu item
 * @returns
 */
declare const updateItemRatingByVendorId: (vendorId: string, itemId: string) => Promise<(import("mongoose").Document<unknown, any, {
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
export { findAllItems, updateItemRatingByVendorId };
