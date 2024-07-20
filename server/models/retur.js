const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const returSchema = mongoose.Schema({
  // firstName: { type: String, required: true },
  // lastName: { type: String, required: true },
  // phone: { type: String, required: true },
  // email: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  // orderDate: { type: Date, required: true },
  bankAccount: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  returnReason: { type: String, required: true },
  observations: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

returSchema.plugin(aggregatePaginate);
const Retur = mongoose.model("Retur", returSchema);
module.exports = {
  Retur,
};
