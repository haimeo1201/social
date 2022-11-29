const login = require('../controller/auth.js')

const express = require('express')
const router = express.Router()

router.post("/login",login)


module.exports = router