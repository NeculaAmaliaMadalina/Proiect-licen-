const { returService } = require("../services");

const returController = {
  async addRetur(req, res, next) {
    try {
      const retur = await returService.addRetur(req.body);
      res.json(retur);
    } catch (error) {
      next(error);
    }
  },
  async getReturById(req, res, next) {
    try {
      const _id = req.params.id;
      const retur = await returService.getReturById(_id);
      res.json(retur);
    } catch (error) {
      next(error);
    }
  },
  async updateReturById(req, res, next) {
    try {
      const _id = req.params.id;
      const retur = await returService.updateReturById(_id, req.body);
      res.json(retur);
    } catch (error) {
      next(error);
    }
  },
  async deleteReturById(req, res, next) {
    try {
      const _id = req.params.id;
      const retur = await returService.deleteReturById(_id);
      res.json(retur);
    } catch (error) {
      next(error);
    }
  },
  async allReturs(req, res, next) {
    try {
      const retur = await returService.allReturs();
      res.json(retur);
    } catch (error) {
      next(error);
    }
  },
  async paginateRetur(req, res, next) {
    try {
      const retur = await returService.paginateRetur(req);
      res.json(retur);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = returController;
