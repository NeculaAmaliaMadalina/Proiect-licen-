const express = require("express");
const router = express.Router();
const auth = require("../middkeware/auth");
const orderController = require("../controllers/order.controller");

router.post(
  "/finalizare_comanda",
  auth("createAny", "order"),
  orderController.addOrder
);
router.get("/all", orderController.allOrders);
router.get("/brand_order_counts", orderController.fetchBrandOrderCounts);
router.get("/category_order_counts", orderController.getCategoryOrderCounts);
router
  .route("/order/:id")
  .get(orderController.getOrder)
  .delete(auth("deleteAny", "order"), orderController.deleteOrderById);
router.post("/paginate/all", orderController.paginateOrders);
module.exports = router;
