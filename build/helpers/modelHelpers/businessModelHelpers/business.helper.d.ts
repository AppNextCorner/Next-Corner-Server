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
 *
 * This helper functions return all vendors
 * @param selections Any selections
 * @returns
 */
declare const findAllVendors: (selections?: any) => Promise<(import("mongoose").Document<unknown, any, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    times: any[];
    categories: import("mongoose").Types.DocumentArray<{
        category?: string | undefined;
    }>;
    menu: import("mongoose").Types.DocumentArray<{
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
        image?: string | undefined;
        price?: number | undefined;
        description?: string | undefined;
        amountInCart?: number | undefined;
        category?: string | undefined;
        rating?: number | undefined;
        featured?: boolean | undefined;
    }>;
    storeStatus: string;
    name?: string | undefined;
    location?: any;
    image?: string | undefined;
    rating?: number | undefined;
    status?: {
        text?: string | undefined;
        color?: string | undefined;
    } | undefined;
    announcements?: {
        cards: import("mongoose").Types.DocumentArray<{
            image?: string | undefined;
            description?: string | undefined;
            color?: string | undefined;
            header?: string | undefined;
        }>;
        toggle?: boolean | undefined;
    } | undefined;
    uid?: string | undefined;
    categoryId?: number | undefined;
    trending?: string | undefined;
}> & Omit<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    times: any[];
    categories: import("mongoose").Types.DocumentArray<{
        category?: string | undefined;
    }>;
    menu: import("mongoose").Types.DocumentArray<{
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
        image?: string | undefined;
        price?: number | undefined;
        description?: string | undefined;
        amountInCart?: number | undefined;
        category?: string | undefined;
        rating?: number | undefined;
        featured?: boolean | undefined;
    }>;
    storeStatus: string;
    name?: string | undefined;
    location?: any;
    image?: string | undefined;
    rating?: number | undefined;
    status?: {
        text?: string | undefined;
        color?: string | undefined;
    } | undefined;
    announcements?: {
        cards: import("mongoose").Types.DocumentArray<{
            image?: string | undefined;
            description?: string | undefined;
            color?: string | undefined;
            header?: string | undefined;
        }>;
        toggle?: boolean | undefined;
    } | undefined;
    uid?: string | undefined;
    categoryId?: number | undefined;
    trending?: string | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>)[]>;
/**
 *
 * This helper function returns vendor (as an array for some reason) with just the name
 *
 * @param nameOfBusiness The name of the business/vendor
 * @param selections Any selections
 * @returns
 */
declare const findVendorByName: (nameOfBusiness: string, selections?: any) => Promise<(import("mongoose").Document<unknown, any, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    times: any[];
    categories: import("mongoose").Types.DocumentArray<{
        category?: string | undefined;
    }>;
    menu: import("mongoose").Types.DocumentArray<{
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
        image?: string | undefined;
        price?: number | undefined;
        description?: string | undefined;
        amountInCart?: number | undefined;
        category?: string | undefined;
        rating?: number | undefined;
        featured?: boolean | undefined;
    }>;
    storeStatus: string;
    name?: string | undefined;
    location?: any;
    image?: string | undefined;
    rating?: number | undefined;
    status?: {
        text?: string | undefined;
        color?: string | undefined;
    } | undefined;
    announcements?: {
        cards: import("mongoose").Types.DocumentArray<{
            image?: string | undefined;
            description?: string | undefined;
            color?: string | undefined;
            header?: string | undefined;
        }>;
        toggle?: boolean | undefined;
    } | undefined;
    uid?: string | undefined;
    categoryId?: number | undefined;
    trending?: string | undefined;
}> & Omit<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    times: any[];
    categories: import("mongoose").Types.DocumentArray<{
        category?: string | undefined;
    }>;
    menu: import("mongoose").Types.DocumentArray<{
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
        image?: string | undefined;
        price?: number | undefined;
        description?: string | undefined;
        amountInCart?: number | undefined;
        category?: string | undefined;
        rating?: number | undefined;
        featured?: boolean | undefined;
    }>;
    storeStatus: string;
    name?: string | undefined;
    location?: any;
    image?: string | undefined;
    rating?: number | undefined;
    status?: {
        text?: string | undefined;
        color?: string | undefined;
    } | undefined;
    announcements?: {
        cards: import("mongoose").Types.DocumentArray<{
            image?: string | undefined;
            description?: string | undefined;
            color?: string | undefined;
            header?: string | undefined;
        }>;
        toggle?: boolean | undefined;
    } | undefined;
    uid?: string | undefined;
    categoryId?: number | undefined;
    trending?: string | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>)[]>;
/**
 * This function finds a vendor with the id of the item the vender offers
 * @param id menuItemid
 * @param selections Any selections
 * @returns vendor as an array for some reason?
 */
declare const findVendorByMenuItemId: (id: string, selections?: any) => Promise<(import("mongoose").Document<unknown, any, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    times: any[];
    categories: import("mongoose").Types.DocumentArray<{
        category?: string | undefined;
    }>;
    menu: import("mongoose").Types.DocumentArray<{
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
        image?: string | undefined;
        price?: number | undefined;
        description?: string | undefined;
        amountInCart?: number | undefined;
        category?: string | undefined;
        rating?: number | undefined;
        featured?: boolean | undefined;
    }>;
    storeStatus: string;
    name?: string | undefined;
    location?: any;
    image?: string | undefined;
    rating?: number | undefined;
    status?: {
        text?: string | undefined;
        color?: string | undefined;
    } | undefined;
    announcements?: {
        cards: import("mongoose").Types.DocumentArray<{
            image?: string | undefined;
            description?: string | undefined;
            color?: string | undefined;
            header?: string | undefined;
        }>;
        toggle?: boolean | undefined;
    } | undefined;
    uid?: string | undefined;
    categoryId?: number | undefined;
    trending?: string | undefined;
}> & Omit<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    times: any[];
    categories: import("mongoose").Types.DocumentArray<{
        category?: string | undefined;
    }>;
    menu: import("mongoose").Types.DocumentArray<{
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
        image?: string | undefined;
        price?: number | undefined;
        description?: string | undefined;
        amountInCart?: number | undefined;
        category?: string | undefined;
        rating?: number | undefined;
        featured?: boolean | undefined;
    }>;
    storeStatus: string;
    name?: string | undefined;
    location?: any;
    image?: string | undefined;
    rating?: number | undefined;
    status?: {
        text?: string | undefined;
        color?: string | undefined;
    } | undefined;
    announcements?: {
        cards: import("mongoose").Types.DocumentArray<{
            image?: string | undefined;
            description?: string | undefined;
            color?: string | undefined;
            header?: string | undefined;
        }>;
        toggle?: boolean | undefined;
    } | undefined;
    uid?: string | undefined;
    categoryId?: number | undefined;
    trending?: string | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
}, never>)[]>;
export { findAllVendors, findVendorByName, findVendorByMenuItemId };
