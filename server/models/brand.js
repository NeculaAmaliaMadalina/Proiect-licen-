const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const brandSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
    unique: 1,
    maxlength: 100,
  },
});
brandSchema.plugin(aggregatePaginate);
const Brand = mongoose.model("Brand", brandSchema);

module.exports = { Brand };
