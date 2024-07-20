const express = require("express");
const router = express.Router();
const auth = require("../middkeware/auth");
const categoryControllers = require("../controllers/category.controller");

router.post(
  "/category",
  auth("createAny", "category"),
  categoryControllers.addCategory
);

router.get("/all", categoryControllers.getCategories);
router.post("/paginate/all", categoryControllers.paginateCategory);
router
  .route("/category/:id")
  .get(categoryControllers.getCategory)
  .patch(auth("updateAny", "category"), categoryControllers.updateCategoryById)
  .delete(
    auth("deleteAny", "category"),
    categoryControllers.deteleCategoryById
  );

module.exports = router;
