const userQueries = require("../db/userQueries");
const validateBodySchema = require("../utils/validateBodySchema");

class userController {
  /** [GET] */
  async getAllPostFromUser(req, res) {
    try {
      const result = await userQueries.getAllPostFromUser(req.id);
      res.json({
        error: 0,
        message: "Get all post from user successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
  async getUserById(req, res) {
    try {
      const bodySchema = {
        type: "object",
        properties: {
          userId: {
            type: "integer",
          },
        },
        required: ["userId"],
      };

      const invalid = validateBodySchema(
        bodySchema,
        req.body,
        10200,
        "Invalid get user by id request body"
      );

      if (invalid !== false) {
        res.json(invalid);

        return;
      }
      const result = await userQueries.getUserById(req.body.userId);
      res.json({
        error: 0,
        message: "Get user by id successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  async getAllPostFromAllUser(req, res) {
    try {
      const result = await userQueries.getAllPostFromAllUser();
      res.json({
        error: 0,
        message: "Get all post from all user successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [GET] */
  async getUserFriendList(req, res) {
    try {
      const result = await userQueries.getUserFriendList(req.id);

      res.json({
        error: 0,
        message: "Get friend list successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [GET] */
  async getNewsFeed(req, res) {
    try {
      const result = await userQueries.getNewsFeed(req.id);

      res.json({
        error: 0,
        message: "Get news feed successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [GET] */
  async getFriendRequest(req, res) {
    try {
      const result = await userQueries.getFriendRequest(req.id);

      res.json({
        error: 0,
        message: "Get friend requests successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [POST] */
  async sendFriendRequest(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        friendId: {
          type: "integer",
        },
      },
      required: ["friendId"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10200,
      "Invalid add friend request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      const result = await userQueries.sendFriendRequest(
        req.id,
        req.body.friendId
      );

      res.json({
        error: 0,
        message: "Friend request sent successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [POST] */
  async acceptFriendRequest(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        friendId: {
          type: "integer",
        },
      },
      required: ["friendId"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10200,
      "Invalid add friend request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      const result = await userQueries.acceptFriendRequest(
        req.id,
        req.body.friendId
      );

      res.json({
        error: 0,
        message: "Accept friend request successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [POST] */
  async removeFriend(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        friendId: {
          type: "integer",
        },
      },
      required: ["friendId"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10200,
      "Invalid remove friend request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      const result = await userQueries.removeFriend(req.id, req.body.friendId);

      res.json({
        error: 0,
        message: "Remove friend successfully",
        data: result,
      });
    } catch (e) {
      res.json(e);
    }
  }
  async getDescription(req, res) {
    try {
      const bodySchema = {
        type: "object",
        properties: {
          userId: {
            type: "integer",
          },
        },
        required: ["userId"],
      };

      const invalid = validateBodySchema(
        bodySchema,
        req.body,
        10200,
        "Invalid request body"
      );

      if (invalid !== false) {
        res.json(invalid);

        return;
      }
      const result = await userQueries.getDescription(req.body.userId);
      res.json({
        error: 0,
        message: "Get descriptions successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
  async rejectFriendRequest(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        friendId: {
          type: "integer",
        },
      },
      required: ["friendId"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10200,
      "Invalid reject friend request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      const result = await userQueries.rejectFriendRequest(
        req.body.friendId,
        req.id
      );

      res.json({
        error: 0,
        message: "Reject friend request successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
  async getRelationship(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        userId: {
          type: "integer",
        },
      },
      required: ["userId"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10200,
      "Invalid reject friend request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      if (req.id === req.body.userId) {
        res.json({
          error: 0,
          message: "Get relationship successfully",
          data: "Yourself",
        });
        return;
      }
      const result = await userQueries.getRelationship(req.id, req.body.userId);

      res.json({
        error: 0,
        message: "Get relationship successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
  async cancelFriendRequest(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        friendId: {
          type: "integer",
        },
      },
      required: ["friendId"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10200,
      "Invalid reject friend request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      const result = await userQueries.cancelFriendRequest(
        req.id,
        req.body.friendId
      );

      res.json({
        error: 0,
        message: "Cancel friend request successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new userController();
