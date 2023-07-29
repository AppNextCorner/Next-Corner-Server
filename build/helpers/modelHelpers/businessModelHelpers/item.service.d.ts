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
import { Iitem } from "../../../interfaces/item.interface";
export default class ItemService {
    model: import("mongoose").Model<Iitem & import("mongoose").Document<any, any, any>, {}, {}, {}, any>;
    private businessModel;
    /**
     * This method returns all items
     * @param selections Any selections
     * @returns
     */
    findAllItems(): Promise<Iitem[]>;
    /**
     * This method returns a specific item with its id
     * @param itemId id of the item
     * @returns
     */
    findItemById(itemId: string): Promise<Iitem[]>;
    /**
     * add comments
     */
    findItemsByVendorId(vendorId: string): Promise<Iitem[] | undefined>;
}
