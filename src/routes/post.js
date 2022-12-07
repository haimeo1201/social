const express = require("express");
const route = express.Router();

const postController = require("../app/controller/postController");

const { authenticateToken } = require("../app/controller/authController");

route.post("/addPost", authenticateToken, postController.addPost);
route.post("/addLikeToPost", authenticateToken, postController.addLikeToPost);
route.post(
  "/addCommentToPost",
  authenticateToken,
  postController.addCommentToPost
);

module.exports = route;
