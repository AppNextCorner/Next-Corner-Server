import { Iitem } from "./item.interface";

export interface ICart {
    inCart: Iitem;
    storeName: string;
    uid: string;
}