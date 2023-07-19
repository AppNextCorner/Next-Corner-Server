import { clockFormat } from "./vendorTime.interface";

export interface Iorder {
    singleOrderList: any[];
    timer: clockFormat;
    orderStatus: string;
    uid: string;
}