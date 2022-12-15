const express = require("express");
const route = express.Router();

const userController = require("../app/controller/userController");

const { isAuth, isAdmin } = require("../app/authentication/authMiddleware");

route.get("/getAllPostFromUser", isAuth, userController.getAllPostFromUser);
route.get(
  "/getAllPostFromAllUser",
  isAuth,
  isAdmin,
  userController.getAllPostFromAllUser
);
route.get("/getUserFriendList", isAuth, userController.getUserFriendList);
route.get("/getNewsFeed", isAuth, userController.getNewsFeed);
route.get("/getFriendRequest", isAuth, userController.getFriendRequest);
route.post("/acceptFriendRequest", isAuth, userController.acceptFriendRequest);
route.post("/sendFriendRequest", isAuth, userController.sendFriendRequest);
route.post("/removeFriend", isAuth, userController.removeFriend);
module.exports = route;
