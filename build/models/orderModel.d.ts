import mongoose from 'mongoose';
declare const orderModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: string;
    singleOrderList: any[];
    timer: number;
    orderStatus: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userId: string;
    singleOrderList: any[];
    timer: number;
    orderStatus: string;
}>>;
export default orderModel;
