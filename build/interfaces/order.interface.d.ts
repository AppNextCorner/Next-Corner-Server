import { ICart } from "./cart.interface";
export interface Iorder {
    orders: ICart[];
    storeInfo: {
        storeName: string;
        storeId: string;
        storeOwner: string;
    };
    minutesToDone: number;
    status: string;
    accepted: string;
    uid: string;
    userName: string;
}
