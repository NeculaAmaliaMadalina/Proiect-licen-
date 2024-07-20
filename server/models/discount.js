const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const discountSchema = new Schema({
  code: { type: String, unique: true, required: true },
  value: { type: Number, required: true },
  type: { type: String, enum: ["percentage", "fixed"], required: true },
  minimumAmount: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
});

discountSchema.plugin(aggregatePaginate);

const Discount = mongoose.model("Discount", discountSchema);

module.exports = {
  Discount,
};
