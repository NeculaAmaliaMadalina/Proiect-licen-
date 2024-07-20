const { Product } = require("../models/product");
const { Category } = require("../models/category");
const { ApiError } = require("../middkeware/apiError");
const httpStatus = require("http-status");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzrjof4wg",
  api_key: "356152186691866",
  api_secret: `${process.env.CN_API_SECRET}`,
});

const addProduct = async (body) => {
  try {
    const product = new Product({
      ...body,
    });
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
};
const getProductById = async (_id) => {
  try {
    const product = await Product.findById(_id)
      .populate("brand")
      .populate("category")
      .populate("subcategory");
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    return product;
  } catch (error) {
    throw error;
  }
};
const updateProductById = async (_id, body) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    return product;
  } catch (error) {
    throw error;
  }
};
const deleteProductById = async (_id) => {
  try {
    const product = await Product.findByIdAndDelete(_id);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    return product;
  } catch (error) {
    throw error;
  }
};

const allProducts = async (req) => {
  try {
    const products = await Product.find({})
      .populate("brand")
      .populate("category")
      .populate("subcategory")
      .sort([["_id", "asc"]]);

    return products;
  } catch (error) {
    throw error;
  }
};
const paginateProducts = async (req) => {
  try {
    let aggQueryArray = [];

    if (req.body.keywords && req.body.keywords != "") {
      const re = new RegExp(`${req.body.keywords}`, "gi");
      aggQueryArray.push({
        $match: { name: { $regex: re } },
      });
    }
    if (req.body.brand && req.body.brand.length > 0) {
      let newBrandsArray = req.body.brand.map(
        (item) => new mongoose.Types.ObjectId(item)
      );
      aggQueryArray.push({
        $match: { brand: { $in: newBrandsArray } },
      });
    }

    if (req.body.color && req.body.color !== "") {
      const color = req.body.color.toLowerCase();
      aggQueryArray.push({
        $match: { color: color },
      });
    }
    if (req.body.size && req.body.size !== "") {
      const size = req.body.size.toUpperCase();
      aggQueryArray.push({
        $match: { size: size },
      });
    }
    if (req.body.category && req.body.category.length > 0) {
      let newCategoryArray = req.body.category.map(
        (item) => new mongoose.Types.ObjectId(item)
      );
      aggQueryArray.push({
        $match: { category: { $in: newCategoryArray } },
      });
    }
    if (req.body.subcategory && req.body.subcategory.length > 0) {
      let newSubcategoryArray = req.body.subcategory.map(
        (item) => new mongoose.Types.ObjectId(item)
      );
      aggQueryArray.push({
        $match: { subcategory: { $in: newSubcategoryArray } },
      });
    }
    if (
      (req.body.min && req.body.min > 0) ||
      (req.body.max && req.body.max < 10000)
    ) {
      if (req.body.min) {
        aggQueryArray.push({ $match: { price: { $gt: req.body.min } } });
      }
      if (req.body.max) {
        aggQueryArray.push({ $match: { price: { $lt: req.body.max } } });
      }
    }

    aggQueryArray.push(
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      { $unwind: "$brand" }
    );

    aggQueryArray.push(
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" }
    );

    aggQueryArray.push(
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      { $unwind: "$subcategory" }
    );

    let aggQuery = Product.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: 8,
      sort: { date: "desc" },
    };
    const products = await Product.aggregatePaginate(aggQuery, options);
    return products;
  } catch (error) {
    throw error;
  }
};

const picUpload = async (req) => {
  try {
    const upload = await cloudinary.uploader.upload(req.files.file.path, {
      public_id: `${Date.now()}`,
      folder: "magic_upload",
    });

    return {
      public_id: upload.public_id,
      url: upload.url,
    };
  } catch (error) {
    throw error;
  }
};

const getWomanProducts = async (categoryId) => {
  try {
    const products = await Product.find({ category: categoryId }).populate(
      "category"
    );
    return products;
  } catch (error) {
    throw error;
  }
};

const paginateByCategory = async (categoryId, filters, page = 1) => {
  try {
    let aggQueryArray = [];

    // Adăugați filtrul pe baza categoriei (utilizând categoryId)
    if (categoryId) {
      aggQueryArray.push({
        $match: { category: new mongoose.Types.ObjectId(categoryId) },
      });
    }

    // Construiți interogările de corespondență (match) în funcție de filtrele primite
    if (filters.keywords && filters.keywords !== "") {
      const re = new RegExp(`${filters.keywords}`, "gi");
      aggQueryArray.push({ $match: { name: { $regex: re } } });
    }
    if (filters.brand && filters.brand.length > 0) {
      let newBrandsArray = filters.brand.map(
        (item) => new mongoose.Types.ObjectId(item)
      );
      aggQueryArray.push({ $match: { brand: { $in: newBrandsArray } } });
    }
    if (filters.color && filters.color !== "") {
      const color = filters.color.toLowerCase();
      aggQueryArray.push({ $match: { color: color } });
    }
    if (filters.size && filters.size !== "") {
      const size = filters.size.toUpperCase();
      aggQueryArray.push({ $match: { size: size } });
    }
    if (filters.subcategory && filters.subcategory.length > 0) {
      let newSubcategoryArray = filters.subcategory.map(
        (item) => new mongoose.Types.ObjectId(item)
      );
      aggQueryArray.push({
        $match: { subcategory: { $in: newSubcategoryArray } },
      });
    }
    if (
      (filters.min && filters.min > 0) ||
      (filters.max && filters.max < 10000)
    ) {
      if (filters.min) {
        aggQueryArray.push({ $match: { price: { $gt: filters.min } } });
      }
      if (filters.max) {
        aggQueryArray.push({ $match: { price: { $lt: filters.max } } });
      }
    }

    // Adăugați etapele de lookup pentru a aduce referințele externe (brands, categories, subcategories)
    aggQueryArray.push(
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      { $unwind: "$brand" },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      { $unwind: "$subcategory" }
    );

    // Construiți interogarea de agregare finală
    let aggQuery = Product.aggregate(aggQueryArray);

    // Definiți opțiunile de paginare
    const options = {
      page: page,
      limit: 8,
      sort: { date: "desc" },
    };

    // Aplicați opțiunile de paginare și returnați rezultatele paginate
    const paginatedResults = await Product.aggregatePaginate(aggQuery, options);

    return paginatedResults;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  allProducts,
  paginateProducts,
  picUpload,
  getWomanProducts,
  paginateByCategory,
};
