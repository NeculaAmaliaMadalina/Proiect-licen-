const { Order } = require("../models/order");
const { Product } = require("../models/product");
const { Brand } = require("../models/brand");
const { Category } = require("../models/category");
const { User } = require("../models/user");
const { Discount } = require("../models/discount");

const addOrder = async (body) => {
  try {
    if (!body.products || body.products.length === 0) {
      throw new Error("Cannot place an order with an empty cart");
    }
    const orderItems = [];
    for (const orderItem of body.products) {
      const product = await Product.findById(orderItem.item);
      if (!product) {
        throw new Error("Product with ID ${orderItem.item} not found");
      }
      if (product.available < orderItem.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }
      const orderProduct = {
        item: product._id,
        quantity: orderItem.quantity,
        name: product.name,
        price: product.price,
      };

      orderItems.push(orderProduct);
    }
    // let totalAmount = 0;
    // orderItems.forEach((orderItem) => {
    //   totalAmount =
    //     orderItem.price * orderItem.quantity +
    //     (orderItem.price * orderItem.quantity < 250 ? 20 : 0);
    // });
    let discountCart = body.discountCart;
    let totalWithDiscount = body.totalWithDiscount;
    // let discountAmount = 0;
    // let code = body.code;
    // let discountCart = null;
    // if (code) {
    //   const discount = await Discount.findOne({ code: code });
    //   if (
    //     discount &&
    //     discount.validFrom <= new Date() &&
    //     discount.validUntil >= new Date()
    //   ) {
    //     if (discount.type === "percentage") {
    //       discountAmount =
    //         discount.minimumAmount <= totalAmount
    //           ? (discountAmount = (discountAmount / 100) * totalAmount)
    //           : 0;
    //     } else if (discount.type === "fixed") {
    //       discountAmount =
    //         discount.minimumAmount <= totalAmount ? discountAmount : 0;
    //     }
    //     discountCart = discount._id;
    //   }
    // }

    // const totalWithDiscount = totalAmount - discountAmount;

    const order = new Order({
      ...body,
      products: orderItems,
      discountCart: discountCart,
      totalWithDiscount: totalWithDiscount,
    });
    await order.save();

    for (const orderItem of body.products) {
      const product = await Product.findById(orderItem.item);

      if (!product) {
        throw new Error(`Product with ID ${orderItem.item} not found`);
      }

      product.available -= orderItem.quantity;
      product.itemSold += orderItem.quantity;

      await product.save();
    }
    const users = await User.findById(order.userId);
    users.history.push(order);

    await users.save();
    return order;
  } catch (error) {
    throw error;
  }
};
const allOrders = async () => {
  try {
    const order = await Order.find({});
    if (!order) throw new ApiError(httpStatus.NOT_FOUND, "No found order");
    return order;
  } catch (error) {
    throw error;
  }
};
const getOrderById = async (id) => {
  try {
    const order = await Order.findById(id).populate("products");
    if (!order)
      throw new ApiError(httpStatus.NOT_FOUND, "Sorry, order not found");
    return order;
  } catch (error) {
    throw error;
  }
};
const deleteOrderById = async (id) => {
  try {
    const order = await Order.findByIdAndDelete(id);
    return order;
  } catch (error) {
    throw error;
  }
};
const paginateOrders = async (req) => {
  try {
    let aggQueryArray = [];

    let aggQuery = Order.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: 6,
      sort: { date: "desc" },
    };
    const orders = await Order.aggregatePaginate(aggQuery, options);
    return orders;
  } catch (error) {
    throw error;
  }
};
const getBrandOrderCounts = async () => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.item",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $lookup: {
          from: "brands",
          localField: "productDetails.brand",
          foreignField: "_id",
          as: "brandDetails",
        },
      },
      { $unwind: "$brandDetails" },
      {
        $group: {
          _id: "$brandDetails.name",
          count: { $sum: "$products.quantity" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    return result;
  } catch (err) {
    console.error("Error aggregating brand order counts:", err);
    throw err;
  }
};
const getCategoryOrderCounts = async (req, res, next) => {
  try {
    const categoryOrderCounts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.item",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $lookup: {
          from: "categories",
          localField: "productDetails.category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      {
        $group: {
          _id: "$categoryDetails.name",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    return categoryOrderCounts;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addOrder,
  allOrders,
  getOrderById,
  deleteOrderById,
  paginateOrders,
  getBrandOrderCounts,
  getCategoryOrderCounts,
};
