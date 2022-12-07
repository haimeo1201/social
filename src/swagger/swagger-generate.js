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
 *              description: Get all post successfully
 * /api/user/getUserFriendList:
 *  get:
 *      tags: [Users route]
 *      summary: Get your current friends lists
 *      responses:
 *          200:
 *              description: Get friend list successfully
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
 * /api/post/addLikeToPost:
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
 *          200:
 *              description: Like post succesfully
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
