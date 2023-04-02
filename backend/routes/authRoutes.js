const express = require("express");
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/signin", loginLimiter, authController.signin);

router.post("/signout", authController.signout);

router.get("/refresh", authController.refresh);

module.exports = router;
