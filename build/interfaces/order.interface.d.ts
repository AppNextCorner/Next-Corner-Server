import { ICart } from "./cart.interface";
export interface Iorder {
    orders: ICart[];
    minutesToDone: number;
    status: string;
    accepted: string;
    uid: string;
}
