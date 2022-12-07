const db = require("../db/database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
/**
 * Login using email and password
 */
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(user.id, "banxinhxinh");
        res.json({ accessToken: accessToken });
      } else {
        res.sendStatus(403).send("Not Allowed");
      }
    } else {
      res.status(404).send("Cannot find user");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something wrong while querying");
  }
};
/**
 * Create new account using email and password.
 * Email must be unique
 */
const register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      res.status(403).send("Email already existed");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });
      res.status(201).send("Create user successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Something wrong while querying");
  }
};
/**
 * Middleware for authorization
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("token missing");

  jwt.verify(token, "banxinhxinh", (err, id) => {
    if (err) {
      console.error(err);
      return res.status(403).send("invalid token");
    }
    req.id = parseInt(id, 10);
    next();
  });
}
module.exports = { login, register, authenticateToken };
