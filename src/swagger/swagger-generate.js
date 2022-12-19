/**
 * @swagger
 * tags:
 *  name: Users route
 *  description: Interact with your own user (add friends, get news feed, ...)
 */
/**
 * @swagger
 * tags:
 *  name: Posts route
 *  description: interact with users' posts
 */
/**
 * @swagger
 * tags:
 *  name: Auth route
 *  description: Authenticate
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         id: 1
 *         email: alice@123
 *         password: 123
 * /api/user/getAllPostFromUser:
 *  get:
 *      tags: [Users route]
 *      summary: Get all post of current user
 *      responses:
 *          200:
 *              description: Get all post from user successfully
 * /api/user/getAllPostFromAllUser:
 *  get:
 *      tags: [Users route]
 *      summary: Get all post of all user
 *      responses:
 *          200:
 *              description: Get all post from all user successfully
 * /api/user/getUserFriendList:
 *  get:
 *      tags: [Users route]
 *      summary: Get your current friends lists
 *      responses:
 *          200:
 *              description: Get friend list successfully
 * /api/user/getNewsFeed:
 *  get:
 *      tags: [Users route]
 *      summary: Get all your friends' and your posts
 *      responses:
 *          200:
 *              description: Get news feed successfully
 * /api/user/getFriendRequest:
 *  get:
 *     tags: [Users route]
 *     summary: Get all friend request
 *     responses:
 *      200:
 *          description: Get friend requests successfully
 * /api/user/sendFriendRequest:
 *  post:
 *     tags: [Users route]
 *     summary: Send a friend request
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          friendId:
 *                              type: integer
 *                              default: 2
 *     responses:
 *          200:
 *              description: Friend request sent successfully
 * /api/user/acceptFriendRequest:
 *  post:
 *     tags: [Users route]
 *     summary: Accept a friend request
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          friendId:
 *                              type: integer
 *                              default: 2
 *     responses:
 *          200:
 *              description: Friend request accepted successfully
 * /api/user/removeFriend:
 *  post:
 *     tags: [Users route]
 *     summary: Remove a friend
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          friendId:
 *                              type: integer
 *                              default: 2
 *     responses:
 *          200:
 *              description: Friend removed successfully
 * /api/post/addPost:
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
 *                              type: string
 *                              default: anh yeu em nhieu lam
 *      responses:
 *          200:
 *              description: Create post succesfully
 * /api/post/removePost:
 *  post:
 *      tags: [Posts route]
 *      summary: Remove a post
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
 *          200:
 *              description: Remove post succesfully
 * /api/post/addCommentToPost:
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
 *                              type: string
 *                              default: bài post của bạn rất hay
 *                          postId:
 *                              type: integer
 *                              default: 1
 *      responses:
 *          200:
 *              description: Comment succesfully
 * /api/post/removeCommentFromPost:
 *  post:
 *      tags: [Posts route]
 *      summary: Remove a comment from a post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          commentId:
 *                              type: integer
 *                              default: 1
 *      responses:
 *          200:
 *              description: Remove comment succesfully
 * /api/post/togglePostLike:
 *  post:
 *      tags: [Posts route]
 *      summary: Toggle like on a post
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
 *          200:
 *              description: Change like status succesfully
 * /api/post/sharePost:
 *  post:
 *      tags: [Posts route]
 *      summary: Share a post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          content:
 *                              type: string
 *                              default: bài post của bạn rất hay
 *                          postId:
 *                              type: integer
 *                              default: 2
 *      responses:
 *          200:
 *              description: Comment succesfully
 * /api/auth/register:
 *  post:
 *      tags: [Auth route]
 *      summary: Register new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              default: alice@123
 *                          password:
 *                              type: string
 *                              default: 123
 *      responses:
 *          201:
 *              description: Create user succesfully
 * /api/auth/login:
 *  post:
 *      tags: [Auth route]
 *      summary: Login using email and password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              default: alice@123
 *                          password:
 *                              type: string
 *                              default: 123
 *      responses:
 *          200:
 *              description: Login successfully, return a token
 */
