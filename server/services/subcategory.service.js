const { Subcategory } = require("../models/subcategory");
const { Category } = require("../models/category");
const { ApiError } = require("../middkeware/apiError");
const httpStatus = require("http-status");

const addSubcategory = async (subcategoryName, ids) => {
  try {
    const existingCategories = await Category.find({
      _id: { $in: ids },
    });
    const existingCategoryNames = existingCategories.map(
      (category) => category.name
    );
    const categoryIds = existingCategories.map((categories) => categories._id);

    const subcategory = new Subcategory({
      name: subcategoryName,
      category: categoryIds,
    });

    await subcategory.save();

    return subcategory;
  } catch (error) {
    throw error;
  }
};
const getSubcategoryById = async (id) => {
  try {
    const subcategory = await Subcategory.findById(id);
    if (!subcategory)
      throw new ApiError(httpStatus.NOT_FOUND, "Subcategory not found");
    return subcategory;
  } catch (error) {
    throw error;
  }
};

const deteleSubcategoryById = async (id) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(id);
    return subcategory;
  } catch (error) {
    throw error;
  }
};
const updateSubcategoryById = async (_id, body) => {
  try {
    const subcategory = await Subcategory.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );
    if (!subcategory)
      throw new ApiError(httpStatus.NOT_FOUND, "Subcategory not found");
    return subcategory;
  } catch (error) {
    throw error;
  }
};
const getSubcategories = async () => {
  try {
    const subcategory = await Subcategory.find({});
    if (!subcategory)
      throw new ApiError(httpStatus.NOT_FOUND, "No found subcategories");
    return subcategory;
  } catch (error) {
    throw error;
  }
};
const paginateSubcategory = async (req) => {
  try {
    let aggQueryArray = [];

    if (req.body.keywords && req.body.keywords != "") {
      const re = new RegExp(`${req.body.keywords}`, "gi");
      aggQueryArray.push({
        $match: { name: { $regex: re } },
      });
    }
    let aggQuery = Subcategory.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: 6,
    };

    const subcategory = await Subcategory.aggregatePaginate(aggQuery, options);
    return subcategory;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addSubcategory,
  getSubcategoryById,
  deteleSubcategoryById,
  updateSubcategoryById,
  getSubcategories,
  paginateSubcategory,
};
