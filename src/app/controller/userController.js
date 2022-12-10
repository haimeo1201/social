const userQueries = require("../db/userQueries");

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
}

module.exports = new userController();
