const express = require("express");
const router = express.Router();
const auth = require("../middkeware/auth");
const discountController = require("../controllers/discount.controller");

router.post("/", auth("createAny", "discount"), discountController.addDiscount);
router.get("/all", discountController.allDiscount);
router.post("/paginate/all", discountController.paginateDiscount);
router.post("/apply", discountController.applyDiscountByCode);
router
  .route("/:id")
  .get(discountController.getDiscountById)
  .patch(auth("updateAny", "discount"), discountController.updateDiscountById)
  .delete(auth("deleteAny", "discount"), discountController.deleteDiscountById);

module.exports = router;
