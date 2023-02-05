const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  cartData: 
    {
        name: {type: String, required: true},
        itemId: {type: Number, required: true},
        timeToMake: {type: Number, required: true},
        image: {type: Object, required: true},
        price: {type: Number, required: true},
        options: [],
        amountInCart: {type: Number, required: true},
    }
  ,
  businessOrderedFrom: {type: String, required: true},
  userId: {type: String, required: true},
  location: [],
  logo: {type: Object},
  
}

)
cartSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    },
})

const cartModel = mongoose.model('cart', cartSchema)

module.exports = cartModel
