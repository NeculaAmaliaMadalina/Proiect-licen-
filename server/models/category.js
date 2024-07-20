const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const categorySchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
    unique: 1,
    maxlength: 100,
  },
});
categorySchema.plugin(aggregatePaginate);
const Category = mongoose.model("Category", categorySchema);
module.exports = { Category };
