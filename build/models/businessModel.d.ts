import mongoose from "mongoose";
declare const vendorModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string[];
    announcements: mongoose.Types.DocumentArray<{
        image: string[];
        description?: string | undefined;
        color?: string | undefined;
        header?: string | undefined;
    }>;
    categories: mongoose.Types.DocumentArray<{
        category?: string | undefined;
    }>;
    menu: mongoose.Types.DocumentArray<{
        image: string[];
        customizations: mongoose.Types.DocumentArray<{
            optionCustomizations: mongoose.Types.DocumentArray<{
                label?: string | undefined;
                selected?: boolean | undefined;
                optionId?: string | undefined;
            }>;
            type?: string | undefined;
            name?: string | undefined;
        }>;
        name?: string | undefined;
        time?: number | undefined;
        price?: number | undefined;
        description?: string | undefined;
        amountInCart?: number | undefined;
        category?: string | undefined;
        rating?: number | undefined;
        featured?: boolean | undefined;
    }>;
    close?: string | undefined;
    name?: string | undefined;
    userId?: string | undefined;
    location?: any;
    rating?: number | undefined;
    status?: {
        text?: string | undefined;
        color?: string | undefined;
    } | undefined;
    open?: string | undefined;
    categoryId?: number | undefined;
    trending?: string | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string[];
    announcements: mongoose.Types.DocumentArray<{
        image: string[];
        description?: string | undefined;
        color?: string | undefined;
        header?: string | undefined;
    }>;
    categories: mongoose.Types.DocumentArray<{
        category?: string | undefined;
    }>;
    menu: mongoose.Types.DocumentArray<{
        image: string[];
        customizations: mongoose.Types.DocumentArray<{
            optionCustomizations: mongoose.Types.DocumentArray<{
                label?: string | undefined;
                selected?: boolean | undefined;
                optionId?: string | undefined;
            }>;
            type?: string | undefined;
            name?: string | undefined;
        }>;
        name?: string | undefined;
        time?: number | undefined;
        price?: number | undefined;
        description?: string | undefined;
        amountInCart?: number | undefined;
        category?: string | undefined;
        rating?: number | undefined;
        featured?: boolean | undefined;
    }>;
    close?: string | undefined;
    name?: string | undefined;
    userId?: string | undefined;
    location?: any;
    rating?: number | undefined;
    status?: {
        text?: string | undefined;
        color?: string | undefined;
    } | undefined;
    open?: string | undefined;
    categoryId?: number | undefined;
    trending?: string | undefined;
}>>;
declare const categoryModel: mongoose.Model<{
    category?: string | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    category?: string | undefined;
}>>;
declare const announcementModel: mongoose.Model<{
    image: string[];
    description?: string | undefined;
    color?: string | undefined;
    header?: string | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    image: string[];
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
declare const itemModel: mongoose.Model<{
    image: string[];
    customizations: mongoose.Types.DocumentArray<{
        optionCustomizations: mongoose.Types.DocumentArray<{
            label?: string | undefined;
            selected?: boolean | undefined;
            optionId?: string | undefined;
        }>;
        type?: string | undefined;
        name?: string | undefined;
    }>;
    name?: string | undefined;
    time?: number | undefined;
    price?: number | undefined;
    description?: string | undefined;
    amountInCart?: number | undefined;
    category?: string | undefined;
    rating?: number | undefined;
    featured?: boolean | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    image: string[];
    customizations: mongoose.Types.DocumentArray<{
        optionCustomizations: mongoose.Types.DocumentArray<{
            label?: string | undefined;
            selected?: boolean | undefined;
            optionId?: string | undefined;
        }>;
        type?: string | undefined;
        name?: string | undefined;
    }>;
    name?: string | undefined;
    time?: number | undefined;
    price?: number | undefined;
    description?: string | undefined;
    amountInCart?: number | undefined;
    category?: string | undefined;
    rating?: number | undefined;
    featured?: boolean | undefined;
}>>;
export { vendorModel, categoryModel, announcementModel, optionLabelModel, optionModel, itemModel, };
