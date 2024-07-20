const express = require("express");
const router = express.Router();
const auth = require("../middkeware/auth");
const returController = require("../controllers/retur.controller");

router.post("/", auth("createAny", "retur"), returController.addRetur);
router
  .route("/retur/:id")
  .get(returController.getReturById)
  .patch(auth("updateAny", "retur"), returController.updateReturById)
  .delete(auth("deleteAny", "retur"), returController.deleteReturById);

router.get("/all", returController.allReturs);
router.post("/paginate/all", returController.paginateRetur);
module.exports = router;
