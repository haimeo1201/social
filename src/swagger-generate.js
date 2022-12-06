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
 *          403:
 *              description: No user match email provided
 *          500:
 *              description: Something wrong while querying
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
 *          403:
 *              description: No user match email provided
 *          500:
 *              description: Something wrong while querying
 */
