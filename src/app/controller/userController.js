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
        message: "Get friend user successfully",
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
        message: "Get friend request successfully",
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
    const friendId = req.body.friendId;
    const id = req.id;
    if (friendId == id) {
      res.json({
        error: 10203,
        message: "You can't add yourself to your friends list",
        data: [],
      });
      return;
    }
    try {
      const friendRequest = await userQueries.getFriendRequest(id);
      const friendList = await userQueries.getUserFriendList(id);
      const friend = await userQueries.getUserById(friendId);
      if (friend === null) {
        res.json({
          error: 10201,
          message: "Friend not found",
          data: [],
        });
        return;
      }
      let List = [];
      friendList.forEach((element) => {
        List.push(element.id);
      });
      if (List.includes(friendId)) {
        res.json({
          error: 10202,
          message: "Already in friends list",
          data: [],
        });
        return;
      }
      let Request = [];
      friendRequest.forEach((element) => {
        Request.push(element.id);
      });
      if (Request.includes(friendId)) {
        res.json({
          error: 10204,
          message: "Already sent friend request match to user",
          data: [],
        });
        return;
      }
      const result = userQueries.sendFriendRequest(id, friendId);
      res.json({
        error: 0,
        message: "Send friend request successfully",
        data: result,
      });
    } catch (e) {
      res.json(e);
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
    const friendId = req.body.friendId;
    const id = req.id;
    if (friendId == id) {
      res.json({
        error: 10203,
        message: "You can't add yourself to your friends list",
        data: [],
      });
      return;
    }
    try {
      const friendList = await userQueries.getUserFriendList(id);
      const friend = await userQueries.getUserById(friendId);
      const friendRequest = await userQueries.getFriendRequest(id);
      if (friend === null) {
        res.json({
          error: 10201,
          message: "Friend not found",
          data: [],
        });
        return;
      }
      let List = [];
      friendList.forEach((element) => {
        List.push(element.id);
      });
      if (List.includes(friendId)) {
        res.json({
          error: 10201,
          message: "Already in friends list",
          data: [],
        });
        return;
      }
      List = [];
      friendRequest.forEach((element) => {
        List.push(element.senderId);
      });
      if (!List.includes(friendId)) {
        res.json({
          error: 10206,
          message: "No friend request match this user",
          data: [],
        });
        return;
      }
      const result = userQueries.acceptFriendRequest(id, friendId);
      res.json({
        error: 0,
        message: "Accept friend request successfully",
        data: result,
      });
    } catch (e) {
      res.json(e);
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
      "Invalid add friend request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }
    const friendId = req.body.friendId;
    const id = req.id;
    if (friendId == id) {
      res.json({
        error: 10203,
        message: "You can't remove yourself",
        data: [],
      });
      return;
    }
    try {
      const friendList = await userQueries.getUserFriendList(id);
      const friend = await userQueries.getUserById(friendId);
      if (friend === null) {
        res.json({
          error: 10201,
          message: "Friend not found",
          data: [],
        });
        return;
      }
      let List = [];
      friendList.forEach((element) => {
        List.push(element.id);
      });
      if (!List.includes(friendId)) {
        res.json({
          error: 10205,
          message: "User not in friends list",
          data: [],
        });
        return;
      }
      const result = userQueries.removeFriend(id, friendId);
      res.json({
        error: 0,
        message: "Remove friend successfully",
        data: result,
      });
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = new userController();
