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
 */

router.post("/addPost", authenticateToken, addPost);

router.post("/addLike", authenticateToken, addLike);

router.post("/addComment", authenticateToken, addComment);

module.exports = router;
