const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    singleOrderList: [],
    timer: {type: Number, required: true},
    orderStatus: {type: String, required: true},
    userId: {type: String, required: true},
}, {timestamps: true})
orderSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    },
})
const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;