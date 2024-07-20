const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const subcategorySchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
    maxlength: 100,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});
subcategorySchema.plugin(aggregatePaginate);
const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = { Subcategory };
