import { Document } from "mongoose";

export interface schedule {
    open: string;
    close: string;
}

export interface Itime extends Document {
    day: string;
    time: schedule;
    status: boolean;
}