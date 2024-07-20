const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const orderSchema = mongoose.Schema({
  products: [
    {
      item: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  contactInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    county: { type: String, required: true },
    city: { type: String, required: true },
  },
  paymentInfo: {
    method: { type: String, enum: ["cash", "card"], required: true },
    cardDetails: {
      number: { type: String },
      name: { type: String },
      expiry: { type: String },
      cvc: { type: String },
    },
  },
  totalAmount: { type: Number, required: true },
  discountCart: { type: Schema.Types.ObjectId, ref: "Discount" },
  totalWithDiscount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});
orderSchema.plugin(aggregatePaginate);
const Order = mongoose.model("Order", orderSchema);
module.exports = {
  Order,
};
