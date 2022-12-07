const express = require("express");
const route = express.Router();

const { login, register } = require("../app/controller/authController.js");

route.post("/register", register);
route.post("/login", login);

module.exports = route;
