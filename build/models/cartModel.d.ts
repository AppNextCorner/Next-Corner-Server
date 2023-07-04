import mongoose from 'mongoose';
declare const cartModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    businessOrderedFrom: string;
    userId: string;
    cartData?: {
        name: string;
        itemId: number;
        time: number;
        image: any;
        price: number;
        customizations: any[];
        amountInCart: number;
        category: string;
        rating: number;
        property?: string | undefined;
        description?: string | undefined;
    } | undefined;
    location?: any;
    logo?: any;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    businessOrderedFrom: string;
    userId: string;
    cartData?: {
        name: string;
        itemId: number;
        time: number;
        image: any;
        price: number;
        customizations: any[];
        amountInCart: number;
        category: string;
        rating: number;
        property?: string | undefined;
        description?: string | undefined;
    } | undefined;
    location?: any;
    logo?: any;
}>>;
export { cartModel };
