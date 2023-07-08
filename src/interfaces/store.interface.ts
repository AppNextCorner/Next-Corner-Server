import { Document, Types } from "mongoose";
import { Iannouncements } from "./announcement.interface";
import { Ilocation } from "./location.interface";
import { Icategory } from "./categorySchema.interface";
import { Iitem } from "./item.interface";
import { Istatus } from "./status.interface";
import { Itime } from "./vendorTime.interface";

export interface IBusiness extends Document {
    _id: Types.ObjectId;
    name: String;
    image: String | null;
    announcements: Iannouncements[];
    location: Ilocation;
    times : Itime[];
    categories : Icategory[];
    menu: Iitem[];
    uid: string;
    categoryId: number;
    rating: number;
    trending: string;
    storeStatus: string;
    status: Istatus;
}