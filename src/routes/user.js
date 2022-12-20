const express = require("express");
const route = express.Router();

const userController = require("../app/controller/userController");

const { isAuth, isAdmin } = require("../app/authentication/authMiddleware");

route.get("/getAllPostFromAllUser", userController.getAllPostFromAllUser);
route.get("/getNewsFeed", isAuth, userController.getNewsFeed);
route.get("/getFriendRequest", isAuth, userController.getFriendRequest);

route.post("/sendFriendRequest", isAuth, userController.sendFriendRequest);
route.post("/acceptFriendRequest", isAuth, userController.acceptFriendRequest);
route.post("/removeFriend", isAuth, userController.removeFriend);
route.post("/getUserById", userController.getUserById);
route.post("/getUserDescriptionById", userController.getDescription);

module.exports = route;
