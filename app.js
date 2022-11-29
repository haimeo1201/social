const express = require('express');
const app = express()
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/auth.js');
app.use(express.json())
app.use("/api/auth",authRouter)
app.listen(3000,() => {
    console.log("listen at port 3000")
})

