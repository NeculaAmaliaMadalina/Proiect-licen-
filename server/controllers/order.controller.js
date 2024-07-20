const { orderService } = require("../services");
const { addOrderEmail } = require("../services/email.service");

const orderController = {
  async addOrder(req, res, next) {
    try {
      const order = await orderService.addOrder(req.body);
      await addOrderEmail(req.body.contactInfo.email);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
  async allOrders(req, res, next) {
    try {
      const order = await orderService.allOrders();
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
  async paginateOrders(req, res, next) {
    try {
      const orders = await orderService.paginateOrders(req);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  },
  async getOrder(req, res, next) {
    try {
      const id = req.params.id;
      const order = await orderService.getOrderById(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
  async deleteOrderById(req, res, next) {
    try {
      const id = req.params.id;
      const order = await orderService.deleteOrderById(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
  async fetchBrandOrderCounts(req, res, next) {
    try {
      const brandOrderCounts = await orderService.getBrandOrderCounts();
      res.json(brandOrderCounts);
    } catch (error) {
      next(error);
    }
  },
  async getCategoryOrderCounts(req, res, next) {
    try {
      const categoryOrderCounts = await orderService.getCategoryOrderCounts();
      res.json(categoryOrderCounts);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
