const express = require("express");
const router = express.Router();
const auth = require("../middkeware/auth");
const subcategoryController = require("../controllers/subcategory.controller");

router.post(
  "/subcategory",
  auth("createAny", "subcategory"),
  subcategoryController.addSubcategory
);

router.get("/all", subcategoryController.getSubcategories);
router.post("/paginate/all", subcategoryController.paginateSubcategory);
router
  .route("/subcategory/:id")
  .get(subcategoryController.getSubcategory)
  .patch(
    auth("updateAny", "subcategory"),
    subcategoryController.updateSubcategoryById
  )
  .delete(
    auth("deleteAny", "subcategory"),
    subcategoryController.deteleSubcategoryById
  );

module.exports = router;
