const express = require("express");
const router = express.Router();
const {
  getPost,
  addFriend,
  getFriendsList,
  getNewsFeed,
} = require("../controller/userController.js");
const { authenticateToken } = require("../controller/authController");

router.get("/getPost", authenticateToken, getPost);

router.post("/addFriend", authenticateToken, addFriend);

router.get("/getFriendList", authenticateToken, getFriendsList);

router.get("/newsFeed", authenticateToken, getNewsFeed);

module.exports = router;
