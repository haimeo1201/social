const bcrypt = require("bcrypt");

const validateBodySchema = require("../utils/validateBodySchema");

const userQueries = require("../db/userQueries");
const authMethod = require("../authentication/authMethod");

class authController {
  /** [POST] */
  async login(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        password: {
          type: "string",
          nullable: false,
        },
        email: {
          type: "string",
          nullable: false,
        },
      },
      required: ["password", "email"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10100,
      "Invalid login request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await userQueries.getUserByEmail(email);

      if (user === null) {
        res.json({
          error: 10101,
          message: "This account doesn't exist",
          data: [],
        });

        return;
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        res.json({
          error: 10102,
          message: "Password is not correct",
          data: [],
        });

        return;
      }

      const dataForAccessToken = {
        id: user.id,
        role: user.role,
      };

      const accessTokenLife = "300m";

      const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenLife
      );

      if (!accessToken) {
        res.json({
          error: 10103,
          message: "Login fail",
          data: [],
        });

        return;
      }

      res.json({
        error: 0,
        message: "Login successfully",
        data: {
          accessToken: accessToken,
          id: user.id,
          email: user.email,
          userType: user.role,
          name: user.name,
          avatar: user.profile.avatar,
        },
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [POST] */
  async register(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        password: {
          type: "string",
          nullable: false,
        },
        email: {
          type: "string",
          nullable: false,
        },
        name: {
          type: "string",
          nullable: false,
        },
        age: {
          type: "integer",
          nullable: false,
        },
        gender: {
          type: "string",
          nullable: false,
        },
      },
      required: ["password", "email", "name", "age", "gender"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10100,
      "Invalid register request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      const email = req.body.email;
      const password = bcrypt.hashSync(req.body.password, 10);

      const user = await userQueries.getUserByEmail(email);

      if (user !== null) {
        res.json({
          error: 10104,
          message: "This email already existed",
          data: [],
        });

        return;
      }

      const newUser = await userQueries.createNewUser(
        email,
        password,
        req.body.name,
        req.body.age,
        req.body.gender
      );

      res.json({
        error: 0,
        message: "Register successfully",
        data: newUser,
      });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new authController();
