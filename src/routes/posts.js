const {addComment, addLike, addPost} = require('../controller/postController')
const {authenticateToken} = require('../controller/authController')
const express = require('express')
const router = express.Router()

router.post("/addPost",authenticateToken,addPost)
router.post("/addLike",authenticateToken,addLike)
router.post("/addComment",authenticateToken,addComment)

module.exports = router