const { brandService } = require("../services");

const brandController = {
  async addBrand(req, res, next) {
    try {
      const brand = await brandService.addBrand(req.body.name);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  },
  async getBrand(req, res, next) {
    try {
      const id = req.params.id;
      const brand = await brandService.getBrandById(id);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  },
  async deleteBrandById(req, res, next) {
    try {
      const id = req.params.id;
      const brand = await brandService.deleteBrandById(id);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  },
  async getBrands(req, res, next) {
    try {
      const brand = await brandService.getBrands(req.body);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  },
  async paginateBrand(req, res, next) {
    try {
      const brand = await brandService.paginateBrand(req);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  },
  async updateBrandById(req, res, next) {
    try {
      const _id = req.params.id;
      const brand = await brandService.updateBrandById(_id, req.body);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = brandController;
