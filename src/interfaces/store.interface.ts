import { Types } from "mongoose";
import { Iannouncements } from "./announcement.interface";
import { Ilocation } from "./location.interface";
import { Icategory } from "./categorySchema.interface";
import { Iitem } from "./item.interface";
import { Istatus } from "./status.interface";
import { Itime } from "./vendorTime.interface";

export interface IBusiness {
  _id?: Types.ObjectId;
  name: string;
  image: string | null;
  announcements: {
    cards: Iannouncements[];
    toggle: boolean;
  };
  location: Ilocation;
  times: Itime[];
  itemCategories: string[];
  category: Icategory;
  menu: Iitem[];
  uid: string;
  rating: number;
  trending: string;
  storeStatus: string;
  status: Istatus;
}
