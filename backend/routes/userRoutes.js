const express = require("express");
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createNewUser);
router.delete("/", verifyJWT, userController.deleteUser);
// router.patch("/", verifyJWT, userController.updateUser);

module.exports = router;
