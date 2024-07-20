const { Category } = require("../models/category");
const { ApiError } = require("../middkeware/apiError");
const httpStatus = require("http-status");

const addCategory = async (categoryname) => {
  try {
    const category = new Category({
      name: categoryname,
    });
    await category.save();
    return category;
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await Category.findById(id);
    if (!category)
      throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    return category;
  } catch (error) {
    throw error;
  }
};

const deteleCategoryById = async (id) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    return category;
  } catch (error) {
    throw error;
  }
};

const getCategories = async () => {
  try {
    const category = await Category.find({});
    if (!category)
      throw new ApiError(httpStatus.NOT_FOUND, "No found categories");
    return category;
  } catch (error) {
    throw error;
  }
};
const updateCategoryById = async (_id, body) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );
    if (!category)
      throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    return category;
  } catch (error) {
    throw error;
  }
};
const paginateCategory = async (req) => {
  try {
    let aggQueryArray = [];

    if (req.body.keywords && req.body.keywords != "") {
      const re = new RegExp(`${req.body.keywords}`, "gi");
      aggQueryArray.push({
        $match: { name: { $regex: re } },
      });
    }
    let aggQuery = Category.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: 6,
    };

    const category = await Category.aggregatePaginate(aggQuery, options);
    return category;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addCategory,
  getCategoryById,
  deteleCategoryById,
  getCategories,
  updateCategoryById,
  paginateCategory,
};
