const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = mongoose.Schema({
  name: {
    required: [true, "You need a name"],
    type: String,
    unique: 1,
    maxlength: 250,
  },
  description: {
    required: [true, "You need a description"],
    type: String,
    unique: 1,
    maxlength: 1000,
  },
  price: {
    required: true,
    type: Number,
    maxlength: 255,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  size: {
    required: true,
    type: String,
    maxlength: 255,
  },
  color: {
    required: true,
    type: String,
    maxlength: 255,
  },
  available: {
    required: [true, "How many of this model we own"],
    type: Number,
    maxlength: 5000,
    default: 0,
  },
  itemSold: {
    required: true,
    type: Number,
    default: 0,
  },
  shipping: {
    required: [true, "Specify if this product has free shipping"],
    type: Boolean,
    default: false,
  },
  images: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model("Product", productSchema);
module.exports = {
  Product,
};
