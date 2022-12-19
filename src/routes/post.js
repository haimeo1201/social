const express = require("express");
const route = express.Router();

const postController = require("../app/controller/postController");

const { isAuth } = require("../app/authentication/authMiddleware");
const upload = require("../app/media/upload");

route.post("/addPost", isAuth, upload.single("file"), postController.addPost);
route.post("/removePost", isAuth, postController.removePost);
route.post("/addCommentToPost", isAuth, postController.addCommentToPost);
route.post(
  "/removeCommentFromPost",
  isAuth,
  postController.removeCommentFromPost
);
route.post("/togglePostLike", isAuth, postController.togglePostLike);
route.post("/sharePost", isAuth, postController.sharePost);
route.post("/getPostById", isAuth, postController.getPostById);

module.exports = route;
