const express = require("express");
const route = express.Router();

const postController = require("../app/controller/postController");

const { isAuth } = require("../app/authentication/authMiddleware");

route.post("/addPost", isAuth, postController.addPost);
route.post("/addLikeToPost", isAuth, postController.addLikeToPost);
route.post("/addCommentToPost", isAuth, postController.addCommentToPost);

module.exports = route;
