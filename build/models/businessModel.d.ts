import mongoose from "mongoose";
import { IBusiness } from "../interfaces/store.interface";
import { Iitem } from "../interfaces/item.interface";
export declare const optionsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    optionCustomizations: mongoose.Types.DocumentArray<{
        label?: string | undefined;
        selected?: boolean | undefined;
        optionId?: string | undefined;
    }>;
    type?: string | undefined;
    name?: string | undefined;
}>;
export declare const itemSchema: mongoose.Schema<Iitem, mongoose.Model<Iitem, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Iitem>;
declare const vendorModel: mongoose.Model<IBusiness & mongoose.Document<any, any, any>, {}, {}, {}, any>;
declare const announcementModel: mongoose.Model<{
    image?: string | undefined;
    description?: string | undefined;
    color?: string | undefined;
    header?: string | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    image?: string | undefined;
    description?: string | undefined;
    color?: string | undefined;
    header?: string | undefined;
}>>;
declare const optionLabelModel: mongoose.Model<{
    label?: string | undefined;
    selected?: boolean | undefined;
    optionId?: string | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    label?: string | undefined;
    selected?: boolean | undefined;
    optionId?: string | undefined;
}>>;
declare const optionModel: mongoose.Model<{
    optionCustomizations: mongoose.Types.DocumentArray<{
        label?: string | undefined;
        selected?: boolean | undefined;
        optionId?: string | undefined;
    }>;
    type?: string | undefined;
    name?: string | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    optionCustomizations: mongoose.Types.DocumentArray<{
        label?: string | undefined;
        selected?: boolean | undefined;
        optionId?: string | undefined;
    }>;
    type?: string | undefined;
    name?: string | undefined;
}>>;
declare const itemModel: mongoose.Model<Iitem & mongoose.Document<any, any, any>, {}, {}, {}, any>;
export { vendorModel, announcementModel, optionLabelModel, optionModel, itemModel, };
