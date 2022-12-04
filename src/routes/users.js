const express = require("express");
const router = express.Router();
const { getPost } = require("../controller/userController.js");
const { authenticateToken } = require("../controller/authController");

router.get("/getPost", authenticateToken, getPost);

module.exports = router;
