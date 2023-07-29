import { Iitem } from "./item.interface";

export interface ICart {
    inCart: Iitem;
    storeId: string;
    uid: string;
}