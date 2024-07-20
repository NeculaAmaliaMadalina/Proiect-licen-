const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const auth = require("../middkeware/auth");

router.post("/register", authController.register);
router.post("/signin", authController.signin);
router.get("/isauth", auth(), authController.isauth);
router.post("/forgot_password", authController.forgotPassword);
router.post("/reset_password", authController.resetPassword);

module.exports = router;
