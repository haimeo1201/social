const {
  addComment,
  addLike,
  addPost,
} = require("../controller/postController");
const { authenticateToken } = require("../controller/authController");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Posts route
 *  description: interact with users' posts
 */

router.post("/addPost", authenticateToken, addPost);
/**
 * @swagger
 * /api/posts/addPost:
 *  post:
 *      tags: [Posts route]
 *      summary: Post something
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          content:
 *                              type: text
 *                              default: anh yeu em nhieu lam
 *      responses:
 *          201:
 *              description: Create post succesfully
 *          401:
 *              description: Unauthenticated request
 *          403:
 *              description: Unauthorized request
 *          500:
 *              description: Something wrong while querying
 */

router.post("/addLike", authenticateToken, addLike);

/**
 * @swagger
 * /api/posts/addLike:
 *  post:
 *      tags: [Posts route]
 *      summary: Like a post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          postId:
 *                              type: integer
 *                              default: 1
 *      responses:
 *          201:
 *              description: Like post succesfully
 *          401:
 *              description: Unauthenticated request
 *          403:
 *              description: Unauthorized request
 *          500:
 *              description: Something wrong while querying
 */

router.post("/addComment", authenticateToken, addComment);

/**
 * @swagger
 * /api/posts/addComment:
 *  post:
 *      tags: [Posts route]
 *      summary: Comment on a post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          content:
 *                              type: text
 *                              default: bài post của bạn rất hay
 *                          postId:
 *                              type: integer
 *                              default: 1
 *      responses:
 *          201:
 *              description: Comment succesfully
 *          401:
 *              description: Unauthenticated request
 *          403:
 *              description: Unauthorized request
 *          500:
 *              description: Something wrong while querying
 */

module.exports = router;
