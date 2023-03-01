const mongoose = require('mongoose')

const menuCategorySchema = new mongoose.Schema({
  property: { type: String },
  type: { type: String },
})
const announcementsSchema = new mongoose.Schema({
  property: { type: String },
  color: { type: String },
  header: { type: String },
  description: { type: String },
  image: [{ type: String }],
})
const optionCustomSchema = new mongoose.Schema({
  property: {type: String},
   label: {type: String},
   selected: {type: Boolean},
})
const optionSchema = new mongoose.Schema({
  property: {type: String},
   name: {type: String},
   type: {type: String},
   itemId: {type: Number},
   optionCustomizations: [optionCustomSchema],
})

const menuSchema = new mongoose.Schema({
  property: { type: String,  },
  name: { type: String },
  itemId: { type: Number },
  time: { type: Number },
  image: [{ type: String }],
  price: { type: Number },
  description: { type: String },
  customizations: [optionSchema],
  category: { type: String },
  featured: { type: Boolean },
  amountInCart: { type: Number },
  rating: { type: Number },
  location: { type: Object}
})
const businessSchema = new mongoose.Schema(
  {
    name: { type: String,  },
    type: { type: String,  },
    image: [{ type: String }],
    announcementCards: [announcementsSchema],
    location: { type: Object,  },
    open: { type: String,  },
    close: { type: String,  },
    categoriesForMenu: [menuCategorySchema],
    menu: [menuSchema],
    userId: { type: String,  },
    categoryId: { type: Number },
    rating: { type: Number },
    trendingCategory: { type: String },
  },
  { timestamps: true },
)
businessSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret.__v
    ret.id = ret._id.toString()
    delete ret._id
  },
})

const cartModel = mongoose.model('business', businessSchema)

module.exports = cartModel
