const express = require("express");
const app = express();
const cors = require("cors");
const cookies = require("cookie");
const authRouter = require("../routes/auth.js");
const postRouter = require("../routes/posts.js");
const userRouter = require("../routes/users.js");
app.use(express.json());
app.use(cors());
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.listen(3000, () => {
  console.log("listen at port 3000");
});
