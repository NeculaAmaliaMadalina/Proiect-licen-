const express = require("express");
const router = express.Router();
const auth = require("../middkeware/auth");
const brandController = require("../controllers/brand.controller");

router
  .route("/brand/:id")
  .get(brandController.getBrand)
  .patch(auth("updateAny", "brand"), brandController.updateBrandById)
  .delete(auth("deleteAny", "brand"), brandController.deleteBrandById);
router.post("/paginate/all", brandController.paginateBrand);
router.post("/brand", auth("createAny", "brand"), brandController.addBrand);
router.get("/all", brandController.getBrands);
module.exports = router;
