const express = require("express");
const route = express.Router();

const userController = require("../app/controller/userController");

const { isAuth } = require("../app/authentication/authMiddleware");

route.get("/getAllPostFromUser", isAuth, userController.getAllPostFromUser);
route.get("/getUserFriendList", isAuth, userController.getUserFriendList);

module.exports = route;
