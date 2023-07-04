import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    singleOrderList: [],
    timer: {type: Number, required: true},
    orderStatus: {type: String, required: true},
    userId: {type: String, required: true},
}, {timestamps: true})
orderSchema.set('toJSON', {
    virtuals: true,
    transform: (_doc: any, ret: any, options: any) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    },
})
const orderModel = mongoose.model('order', orderSchema);

export default orderModel
