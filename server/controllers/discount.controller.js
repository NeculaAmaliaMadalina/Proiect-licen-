const discountService = require("../services/discount.service");

const discountController = {
  async addDiscount(req, res, next) {
    try {
      const discount = await discountService.addDiscount(req.body);
      res.json(discount);
    } catch (error) {
      next(error);
    }
  },
  async getDiscountById(req, res, next) {
    try {
      const _id = req.params.id;
      const discount = await discountService.getDiscountById(_id);
      res.json(discount);
    } catch (error) {
      next(error);
    }
  },
  async applyDiscountByCode(req, res, next) {
    try {
      const { code, products, discounts } = req.body;
      const discount = await discountService.applyDiscountByCode(code);
      res.json(discount);
    } catch (error) {
      next(error);
    }
  },
  async updateDiscountById(req, res, next) {
    try {
      const _id = req.params.id;
      const discount = await discountService.updateDiscountById(_id, req.body);
      res.json(discount);
    } catch (error) {
      next(error);
    }
  },
  async deleteDiscountById(req, res, next) {
    try {
      const _id = req.params.id;
      const discount = await discountService.deleteDiscountById(_id);
      res.json(discount);
    } catch (error) {
      next(error);
    }
  },
  async allDiscount(req, res, next) {
    try {
      const discount = await discountService.allDiscount();
      res.json(discount);
    } catch (error) {
      next(error);
    }
  },
  async paginateDiscount(req, res, next) {
    try {
      const discount = await discountService.paginateDiscount(req);
      res.json(discount);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = discountController;
