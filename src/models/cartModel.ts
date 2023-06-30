import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  cartData: 
    {
        property: { type: String,  },
        name: {type: String, required: true},
        itemId: {type: Number, required: true},
        time: {type: Number, required: true},
        image: {type: Object, required: true},
        price: {type: Number, required: true},
        customizations: [],
        description: { type: String },
        amountInCart: {type: Number, required: true},
        category: {type: String, required: true},
        rating: {type: Number, required: true}
    }
  ,
  businessOrderedFrom: {type: String, required: true},
  userId: {type: String, required: true},
  location: {type: Object},
  logo: {type: Object},
  
}, {timestamps: true}
)
cartSchema.set('toJSON', {
    virtuals: true,
    transform: (_doc: any, ret: any, _options: any) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    },
})

const cartModel = mongoose.model('cart', cartSchema)

export {cartModel}
