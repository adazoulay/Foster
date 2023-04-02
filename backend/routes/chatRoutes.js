const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const verifyJWT = require("../middleware/verifyJWT");

module.exports = router;
