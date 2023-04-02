const express = require("express");
const contactController = require("../controllers/contactController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

//! Util
router.get("/getAllContacts", contactController.getAllContacts);

//! Get Contact UserId
// Add verifyJWT later
router.get("/user/:id", contactController.getContactByUserId);

//! Mutate
// Add verifyJWT later
// Remove /:id in createNewContact
router.post("/", verifyJWT, contactController.createNewContact);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

router.patch("/updateTimestamp/:id", contactController.updateTimestamp);

module.exports = router;
