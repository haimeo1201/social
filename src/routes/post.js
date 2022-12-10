const express = require("express");
const route = express.Router();

const postController = require("../app/controller/postController");

const { isAuth } = require("../app/authentication/authMiddleware");

route.post("/addPost", isAuth, postController.addPost);
route.post("/addLikeToPost", isAuth, postController.addLikeToPost);
route.post("/addCommentToPost", isAuth, postController.addCommentToPost);
route.post("/removePost", isAuth, postController.removePost);
route.post(
    "/removeCommentFromPost",
    isAuth,
    postController.removeCommentFromPost
);

module.exports = route;
