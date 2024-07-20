const { Discount } = require("../models/discount");

const addDiscount = async (body) => {
  try {
    const discount = new Discount({
      ...body,
    });
    await discount.save();
    return discount;
  } catch (error) {
    throw error;
  }
};
const getDiscountById = async (_id) => {
  try {
    const discount = await Discount.findById(_id);
    if (!discount)
      throw new ApiError(httpStatus.NOT_FOUND, "discount not found");
    return discount;
  } catch (error) {
    throw error;
  }
};
const applyDiscountByCode = async (code) => {
  try {
    const discount = await Discount.findOne({ code: code });
    if (!discount)
      throw new ApiError(httpStatus.NOT_FOUND, "discount not found");
    return discount;
  } catch (error) {
    throw error;
  }
};

const updateDiscountById = async (_id, body) => {
  try {
    const discount = await Discount.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );
    if (!discount)
      throw new ApiError(httpStatus.NOT_FOUND, "discount not found");
    return discount;
  } catch (error) {
    throw error;
  }
};
const deleteDiscountById = async (_id) => {
  try {
    const discount = await Discount.findByIdAndDelete(_id);
    if (!discount)
      throw new ApiError(httpStatus.NOT_FOUND, "discount not found");
    return discount;
  } catch (error) {
    throw error;
  }
};
const allDiscount = async () => {
  try {
    const discount = await Discount.find({});
    if (!discount)
      throw new ApiError(httpStatus.NOT_FOUND, "No found discount");
    return discount;
  } catch (error) {
    throw error;
  }
};
const paginateDiscount = async (req) => {
  try {
    let aggQueryArray = [];

    if (req.body.keywords && req.body.keywords != "") {
      const re = new RegExp(`${req.body.keywords}`, "gi");
      aggQueryArray.push({
        $match: { code: { $regex: re } },
      });
    }
    let aggQuery = Discount.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: 6,
    };

    const discount = await Discount.aggregatePaginate(aggQuery, options);
    return discount;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addDiscount,
  getDiscountById,
  updateDiscountById,
  deleteDiscountById,
  allDiscount,
  paginateDiscount,
  applyDiscountByCode,
};
