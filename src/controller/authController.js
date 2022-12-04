const db = require("../db/config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
    res.sendStatus(500);
  }
};
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
      res.sendStatus(403).send("user exist");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });
      res.sendStatus(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "banxinhxinh", (err, id) => {
    if (err) {
      console.error(err);
      return res.sendStatus(403);
    }
    req.id = parseInt(id, 10);
    next();
  });
}
module.exports = { login, register, authenticateToken };
