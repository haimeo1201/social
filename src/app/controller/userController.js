const userQueries = require("../db/userQueries");

class userController {
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
}

module.exports = new userController();
