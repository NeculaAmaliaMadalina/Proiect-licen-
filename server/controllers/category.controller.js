const { categoryService } = require("../services");

const categoryControllers = {
  async addCategory(req, res, next) {
    try {
      const category = await categoryService.addCategory(req.body.name);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },

  async getCategory(req, res, next) {
    try {
      const id = req.params.id;
      const category = await categoryService.getCategoryById(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
  async deteleCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      const category = await categoryService.deteleCategoryById(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },

  async getCategories(req, res, next) {
    try {
      const category = await categoryService.getCategories(req.body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
  async paginateCategory(req, res, next) {
    try {
      const category = await categoryService.paginateCategory(req);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
  async updateCategoryById(req, res, next) {
    try {
      const _id = req.params.id;
      const category = await categoryService.updateCategoryById(_id, req.body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryControllers;
