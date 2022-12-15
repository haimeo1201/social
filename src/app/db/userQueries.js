const db = require("./database");
const newError = require("../utils/newError");
const { friendRequest } = require("./database");

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
  async getUserById(id) {
    try {
      const result = await db.user.findUnique({
        where: {
          id: id,
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
          name: email,
          profile: {
            create: {
              bio: "nothing",
              gender: "nothing",
              age: 20,
            },
          },
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
            select: { likes: true, comments: true, listShare: true },
          },
          comments: {
            orderBy: {
              updatedAt: "desc",
            },
          },
          author: {
            select: { name: true },
          },
          sharedFrom: true,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllPostFromAllUser() {
    try {
      const result = await db.post.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          _count: {
            select: { likes: true, comments: true, listShare: true },
          },
          comments: {
            orderBy: {
              updatedAt: "desc",
            },
          },
          author: {
            select: { name: true },
          },
          sharedFrom: true,
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

      return result.hasFriends;
    } catch (error) {
      throw error;
    }
  }
  async getNewsFeed(userId) {
    try {
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          hasFriends: true,
        },
      });
      let friendList = [];
      user.hasFriends.forEach((element) => {
        friendList.push(element.id);
      });
      friendList.push(userId);
      const posts = await db.post.findMany({
        where: {
          authorId: { in: friendList },
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          _count: {
            select: { likes: true, comments: true, listShare: true },
          },
          comments: {
            orderBy: {
              updatedAt: "desc",
            },
          },
          author: {
            select: { name: true },
          },
          sharedFrom: true,
        },
      });
      return posts;
    } catch (e) {
      throw e;
    }
  }
  async sendFriendRequest(userId, friendId) {
    const friendRequest = db.friendRequest.create({
      data: {
        sender: {
          connect: {
            id: userId,
          },
        },
        receiver: {
          connect: {
            id: friendId,
          },
        },
      },
    });
    return friendRequest;
  }
  async getFriendRequest(userId) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friendRequestReceived: true,
      },
    });
    return user.friendRequestReceived;
  }
  async acceptFriendRequest(userId, friendId) {
    const friendRequest = await db.friendRequest.delete({
      where: {
        senderId_receiverId: {
          senderId: friendId,
          receiverId: userId,
        },
      },
    });
    const user = await db.user.update({
      where: {
        id: friendId,
      },
      data: {
        hasFriends: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        hasFriends: true,
      },
    });
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        hasFriends: {
          connect: {
            id: friendId,
          },
        },
      },
    });
    return user;
  }
  async removeFriend(userId, friendId) {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        hasFriends: {
          disconnect: {
            id: friendId,
          },
        },
        friendsWith: {
          disconnect: {
            id: friendId,
          },
        },
      },
    });
    await db.user.update({
      where: {
        id: friendId,
      },
      data: {
        hasFriends: {
          disconnect: {
            id: userId,
          },
        },
        friendsWith: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
    return user;
  }
}

module.exports = new userQueries();
