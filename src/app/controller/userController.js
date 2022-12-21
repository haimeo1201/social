const userQueries = require("../db/userQueries");
const validateBodySchema = require("../utils/validateBodySchema");

class userController {
  async getTrendingPost(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        first: {
          type: "integer",
        },
        last: {
          type: "integer",
        },
      },
      required: ["first", "last"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10300,
      "Invalid get post by id request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }
    try {
      const result = await userQueries.getTrendingPost(
        req.body.first,
        req.body.last
      );
      res.json({
        error: 0,
        message: "Get all post from user successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
  /** [GET] */
  async getAllPostFromUser(req, res) {
    try {
      const result = await userQueries.getAllPostFromUser(req.id);
      console.log(result);
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
  async getFriendRequestSent(req, res) {
    try {
      const result = await userQueries.getSentFriendRequest(req.id);
      res.json({
        error: 0,
        message: "Get friend request sent",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
  async editProfile(req, res) {
    try {
      let avatar, wallpaper;
      if (req.files === null) {
        avatar = null;
        wallpaper = null;
      } else {
        avatar = req.files.avatar ? req.files.avatar[0].filename : null;
        wallpaper = req.files.wallpaper
          ? req.files.wallpaper[0].filename
          : null;
      }
      const result = await userQueries.editProfile(
        req.body.name,
        req.body.description,
        avatar,
        wallpaper,
        req.id
      );
      res.json({
        error: 0,
        message: "Edit profile successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
  async getRandomUserNotFriend(req, res) {
    try {
      const result = await userQueries.getRandomUserNotFriends(req.id);
      res.json({
        error: 0,
        message: "Get random user successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
  async getTopUser(req, res) {
    try {
      const result = await userQueries.getTopUser();
      res.json({
        error: 0,
        message: "Get top user successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new userController();
