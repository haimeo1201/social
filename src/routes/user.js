const express = require("express");
const route = express.Router();

const userController = require("../app/controller/userController");

const { authenticateToken } = require("../app/controller/authController");

route.get(
  "/getAllPostFromUser",
  authenticateToken,
  userController.getAllPostFromUser
);

route.get(
  "/getUserFriendList",
  authenticateToken,
  userController.getUserFriendList
);

module.exports = route;
