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
import { IBusiness } from "../../../interfaces/store.interface";
/**
 * This function returns all items
 * @param selections Any selections
 * @returns
 */
declare const findAllItems: (selections?: any) => Promise<(import("../../../interfaces/item.interface").Iitem & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
declare const findItemById: (itemId: string, selections?: any) => Promise<(import("../../../interfaces/item.interface").Iitem & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
declare const findItemsByVendorId: (vendorId: any, selections?: any) => Promise<import("../../../interfaces/item.interface").Iitem[] | null>;
/**
 * This function updates the rating of an item by using the itemId and vendorId
 * @param vendorId the id of the vendor
 * @param itemId  the id of the menu item
 * @returns
 */
declare const updateItemRatingByVendorId: (vendorId: string, itemId: string) => Promise<(IBusiness & import("mongoose").Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
export { findAllItems, findItemById, findItemsByVendorId, updateItemRatingByVendorId };
