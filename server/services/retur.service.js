const { Retur } = require("../models/retur");
const { Order } = require("../models/order");
const { ApiError } = require("../middkeware/apiError");
const httpStatus = require("http-status");

const addRetur = async (body) => {
  try {
    const { orderId, product } = body;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      throw new Error("Comanda specificată nu există.");
    }
    let productExistsInOrder = false;
    if (order.products && order.products.length > 0) {
      for (const productItem of order.products) {
        if (productItem.item.toString() === product) {
          productExistsInOrder = true;
          break;
        }
      }
    }

    if (!productExistsInOrder) {
      throw new Error("Comanda nu contine produsul specificat.");
    }
    const retur = new Retur({
      ...body,
    });
    await retur.populate("userId");
    await retur.populate("orderId");
    await retur.save();
    return retur;
  } catch (error) {
    throw error;
  }
};
const getReturById = async (_id) => {
  try {
    const retur = await Retur.findById(_id)
      .populate("userId")
      .populate("orderId");
    if (!retur) throw new ApiError(httpStatus.NOT_FOUND, "Retur not found");
    return retur;
  } catch (error) {
    throw error;
  }
};
const updateReturById = async (_id, body) => {
  try {
    const retur = await Retur.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );
    if (!retur) throw new ApiError(httpStatus.NOT_FOUND, "Retur not found");
    return retur;
  } catch (error) {
    throw error;
  }
};
const deleteReturById = async (_id) => {
  try {
    const retur = await Retur.findByIdAndDelete(_id);
    if (!retur) throw new ApiError(httpStatus.NOT_FOUND, "Retur not found");
    return retur;
  } catch (error) {
    throw error;
  }
};
const allReturs = async (req) => {
  try {
    const retur = await Retur.find({})
      .populate("userId")
      .populate("orderId")
      .sort([["_id", "asc"]]);

    return retur;
  } catch (error) {
    throw error;
  }
};
const paginateRetur = async (req) => {
  try {
    let aggQueryArray = [];

    if (req.body.keywords && req.body.keywords != "") {
      const re = new RegExp(`${req.body.keywords}`, "gi");
      aggQueryArray.push({
        $match: { orderId: { $regex: re } },
      });
    }
    let aggQuery = Retur.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: 6,
    };

    const retur = await Retur.aggregatePaginate(aggQuery, options);
    return retur;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addRetur,
  getReturById,
  updateReturById,
  deleteReturById,
  allReturs,
  paginateRetur,
};
