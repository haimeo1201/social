const db = require("./database");
const newError = require("../utils/newError");

class userQueries {
  async getUserByEmail(email) {
    try {
      const result = await db.user.findUnique({
        where: {
          email: email,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createNewUser(email, password) {
    try {
      const result = await db.user.create({
        data: {
          email: email,
          password: password,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllPostFromUser(userId) {
    try {
      const result = await db.post.findMany({
        where: {
          authorId: userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          _count: {
            select: { likes: true, comments: true },
          },
          comments: {
            orderBy: {
              updatedAt: "desc",
            },
          },
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserFriendList(userId) {
    try {
      const result = await db.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          hasFriends: true,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new userQueries();
