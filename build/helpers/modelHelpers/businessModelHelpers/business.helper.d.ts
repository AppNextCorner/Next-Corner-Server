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
/// <reference types="mongoose/types/inferschematype" />
import { Document, ObjectId } from "mongoose";
import { IBusiness } from "../../../interfaces/store.interface";
import { Iitem } from "../../../interfaces/item.interface";
declare const createVendor: (storeData: IBusiness) => Promise<IBusiness>;
/**
 *
 * This helper functions return all vendors
 * @param selections Any selections
 * @returns
 */
declare const findAllVendors: (selections?: any) => Promise<(IBusiness & Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
/**
 *
 * This helper function returns vendor (as an array for some reason) with just the name
 *
 * @param nameOfBusiness The name of the business/vendor
 * @param selections Any selections
 * @returns
 */
declare const findVendorByName: (nameOfBusiness: string, selections?: any) => Promise<(IBusiness & Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
declare const findVendorByMenuItemId: (itemId: string) => Promise<void>;
declare const findVendorByUid: (uid: string, selections?: any) => Promise<(IBusiness & Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
})[]>;
declare const findVendorById: (vendorId: string, selections?: any) => Promise<(IBusiness & Document<any, any, any> & {
    _id: ObjectId;
}) | null>;
/**
 *
 * @param id menu item id / vendor id / announcement id ...
 * @param property what property we want to add to
 * @param newData the data we want to replace with the property
 * @returns
 */
declare const updateProperty: (id: string | undefined, property: string, newData: any) => Promise<(IBusiness & Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}) | null>;
/**
 *
 * @param id Store ID
 * @param newMenu The menu item we want to add to the menu list
 * @returns the store object
 */
declare const updateMenu: (id: string, newMenu: Iitem[], test?: boolean) => Promise<(IBusiness & Document<any, any, any> & {
    _id: ObjectId;
}) | null>;
export { createVendor, findAllVendors, findVendorByName, findVendorByUid, findVendorById, findVendorByMenuItemId, updateProperty, updateMenu, };
