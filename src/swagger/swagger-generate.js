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
 * /api/user/getAllPostFromAllUser:
 *  get:
 *      tags: [Users route]
 *      summary: Get all post of all user
 *      responses:
 *          200:
 *              description: Get all post successfully
 * /api/user/getNewsFeed:
 *  get:
 *      tags: [Users route]
 *      summary: Get all your friends' and your posts
 *      responses:
 *          200:
 *              description: Get friend list successfully
 * /api/user/getFriendRequest:
 *  get:
 *     tags: [Users route]
 *     summary: Get all friend request
 *     responses:
 *      200:
 *          description: Get friend request successfully
 * /api/user/getFriendRequestSent:
 *  get:
 *     tags: [Users route]
 *     summary: Get all friend request sent
 *     responses:
 *      200:
 *          description: Get friend request sent successfully
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
 *              description: Send friend request successfully
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
 *              description: Accept friend request successfully
 * /api/user/rejectFriendRequest:
 *  delete:
 *     tags: [Users route]
 *     summary: Reject a friend request
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
 *              description: Reject friend request successfully
 * /api/user/removeFriend:
 *  delete:
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
 *              description: Remove friend successfully
 * /api/user/getUserById:
 *  post:
 *     tags: [Users route]
 *     summary: Get general information of a user
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: integer
 *                              default: 1
 *     responses:
 *          200:
 *              description: Get user info successfully
 * /api/user/getRelationship:
 *  post:
 *     tags: [Users route]
 *     summary: Get relationship with a user
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: integer
 *                              default: 1
 *     responses:
 *          200:
 *              description: Get user info successfully
 * /api/user/editProfile:
 *   post:
 *      tags: [Users route]
 *      summary: Edit profile
 *      requestBody:
 *          required: true
 *          content:
 *             multipart/form-data:
 *               schema:
 *                   type: object
 *                   properties:
 *                       type:
 *                         type: string
 *                         default: profile
 *                       name:
 *                         type: string
 *                         default: hai
 *                       description:
 *                         type: string
 *                         default: bla
 *                       avatar:
 *                         type: string
 *                         format: binary
 *                       wallpaper:
 *                         type: string
 *                         format: binary
 *      responses:
 *          200:
 *             description: Post successfully
 * /api/user/getTrendingPost:
 *  post:
 *      tags: [Users route]
 *      summary: Get all post of all user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          first:
 *                              type: integer
 *                              default: 0
 *                          last:
 *                              type: integer
 *                              default: 3
 *      responses:
 *           200:
 *               description: Send friend request successfully
 * /api/user/cancelFriendRequest:
 *  delete:
 *     tags: [Users route]
 *     summary: Cancel friend request
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          friendId:
 *                              type: integer
 *                              default: 1
 *     responses:
 *          200:
 *             description: Cancel friend request successfully
 * /api/user/getUserDescriptionById:
 *  post:
 *     tags: [Users route]
 *     summary: Get description of a user
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: integer
 *                              default: 1
 *     responses:
 *          200:
 *              description: Get user info successfully
 * /api/post/getPostById:
 *  post:
 *      tags: [Posts route]
 *      summary: Get a post by id
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
 *              description: Accept friend request successfully
 * /api/post/addPost:
 *   post:
 *      tags: [Posts route]
 *      summary: Post something
 *      requestBody:
 *          required: true
 *          content:
 *             multipart/form-data:
 *               schema:
 *                   type: object
 *                   properties:
 *                       content:
 *                         type: string
 *                       type:
 *                         type: string
 *                         default: post
 *                       file:
 *                         type: string
 *                         format: binary
 *      responses:
 *          200:
 *             description: Post successfully
 * /api/post/removePost:
 *  delete:
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
 *      summary: Comment something
 *      requestBody:
 *          required: true
 *          content:
 *             multipart/form-data:
 *               schema:
 *                   type: object
 *                   properties:
 *                       content:
 *                         type: string
 *                       postId:
 *                         type: integer
 *                         default: 1
 *                       type:
 *                         type: string
 *                         default: post
 *                       file:
 *                         type: string
 *                         format: binary
 *      responses:
 *          200:
 *             description: Post successfully
 * /api/post/removeCommentFromPost:
 *  delete:
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
 *              description: Like post succesfully
 * /api/post/toggleCommentLike:
 *  post:
 *      tags: [Posts route]
 *      summary: Toggle like on a comment
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
 *              description: Like post succesfully
 * /api/post/checkPostLike:
 *  post:
 *      tags: [Posts route]
 *      summary: Check like status on a post
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
 *              description: Like post succesfully
 * /api/post/checkCommentLike:
 *  post:
 *      tags: [Posts route]
 *      summary: Check like status on a comment
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
 *              description: Like post succesfully
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
 *                          name:
 *                              type: string
 *                              default: alice
 *                          age:
 *                              type: integer
 *                              default: 20
 *                          gender:
 *                              type: string
 *                              default: Female
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
