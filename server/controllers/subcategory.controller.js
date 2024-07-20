const { subcategoryService } = require("../services");

const subcategoryControllers = {
  async addSubcategory(req, res, next) {
    try {
      const subcategory = await subcategoryService.addSubcategory(
        req.body.name,
        req.body.category
      );
      res.json(subcategory);
    } catch (error) {
      next(error);
    }
  },
  async getSubcategory(req, res, next) {
    try {
      const id = req.params.id;
      const subcategory = await subcategoryService.getSubcategoryById(id);
      res.json(subcategory);
    } catch (error) {
      next(error);
    }
  },
  async deteleSubcategoryById(req, res, next) {
    try {
      const id = req.params.id;
      const subcategory = await subcategoryService.deteleSubcategoryById(id);
      res.json(subcategory);
    } catch (error) {
      next(error);
    }
  },
  async getSubcategories(req, res, next) {
    try {
      const subcategory = await subcategoryService.getSubcategories(req.body);
      res.json(subcategory);
    } catch (error) {
      next(error);
    }
  },
  async paginateSubcategory(req, res, next) {
    try {
      const subcategory = await subcategoryService.paginateSubcategory(req);
      res.json(subcategory);
    } catch (error) {
      next(error);
    }
  },
  async updateSubcategoryById(req, res, next) {
    try {
      const _id = req.params.id;
      const subcategory = await subcategoryService.updateSubcategoryById(
        _id,
        req.body
      );
      res.json(subcategory);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = subcategoryControllers;
