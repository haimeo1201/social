const express = require("express");
const route = express.Router();

const postController = require("../app/controller/postController");

const { isAuth } = require("../app/authentication/authMiddleware");
const upload = require("../app/media/upload");

route.post("/getPostById", postController.getPostById);
route.post("/addPost", isAuth, upload.single("file"), postController.addPost);
route.delete("/removePost", isAuth, postController.removePost);
route.post("/addCommentToPost", isAuth, postController.addCommentToPost);
route.delete(
  "/removeCommentFromPost",
  isAuth,
  postController.removeCommentFromPost
);
route.post("/togglePostLike", isAuth, postController.togglePostLike);
route.post("/toggleCommentLike", isAuth, postController.toggleCommentLike);
route.post("/checkPostLike", isAuth, postController.checkPostLike);
route.post("/checkCommentLike", isAuth, postController.checkCommentLike);
route.post("/sharePost", isAuth, postController.sharePost);

module.exports = route;
