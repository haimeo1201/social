const express = require("express");
const router = express.Router();
const {
  getPost,
  addFriend,
  getFriendsList,
  getNewsFeed,
} = require("../controller/userController.js");
const { authenticateToken } = require("../controller/authController");
/**
 * @swagger
 * tags:
 *  name: Users route
 *  description: Interact with your own user (add friends, get news feed, ...)
 */

router.get("/getPost", authenticateToken, getPost);

/**
 * @swagger
 * /api/users/getPost:
 *  get:
 *      tags: [Users route]
 *      summary: Get all post of current user
 *      responses:
 *          200:
 *              description: Send back all posts
 *          401:
 *              description: Unauthenticated request
 *          403:
 *              description: Unauthorized request
 *          500:
 *              description: Something wrong while querying
 */
router.post("/addFriend", authenticateToken, addFriend);

/**
 * @swagger
 * /api/users/addFriend:
 *  post:
 *      tags: [Users route]
 *      summary: Add a user to friend lists and the other user also add you to their friend lists
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *                              default: 1
 *      responses:
 *          201:
 *              description: Added friend succesfully
 *          401:
 *              description: Unauthenticated request
 *          403:
 *              description: Unauthorized request
 *          500:
 *              description: Something wrong while querying
 */
router.get("/getFriendList", authenticateToken, getFriendsList);

/**
 * @swagger
 * /api/users/getFriendList:
 *  get:
 *      tags: [Users route]
 *      summary: Get your current friends lists
 *      responses:
 *          200:
 *              description: Return list of friends
 *          401:
 *              description: Unauthenticated request
 *          403:
 *              description: Unauthorized request
 *          500:
 *              description: Something wrong while querying
 */
router.get("/newsFeed", authenticateToken, getNewsFeed);

/**
 * @swagger
 * /api/users/newsFeed:
 *  get:
 *      tags: [Users route]
 *      summary: Get the news feed provided by all of yours post and your friends'
 *      responses:
 *          200:
 *              description: Return news feed
 *          401:
 *              description: Unauthenticated request
 *          403:
 *              description: Unauthorized request
 *          500:
 *              description: Something wrong while querying
 */

module.exports = router;
