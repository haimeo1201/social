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
        include: {
          profile: {
            select: {
              avatar: true,
            },
          },
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
        include: {
          profile: true,
          hasFriends: true,
          posts: {
            orderBy: {
              updatedAt: "desc",
            },
            include: {
              _count: {
                select: {
                  likes: true,
                  comments: true,
                  listShare: true,
                },
              },
              comments: {
                orderBy: {
                  updatedAt: "desc",
                },
                include: {
                  likes: {
                    select: {
                      author: {
                        select: {
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
              likes: {
                select: {
                  author: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
              author: {
                select: {
                  id: true,
                },
              },
              sharedFrom: true,
            },
          },
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getSentFriendRequest(id) {
    try {
      const result = await db.friendRequest.findMany({
        where: {
          senderId: id,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async rejectFriendRequest(friendId, userId) {
    try {
      if (userId === friendId) {
        throw new newError({
          error: 10203,
          message: "You cannot reject yourself",
          data: [],
        });
      }

      const friend = await this.getUserById(friendId);
      if (friend === null) {
        throw new newError({
          error: 10201,
          message: "Friend not found",
          data: [],
        });
      }

      const friendList = await this.getUserFriendList(userId);
      friendList.forEach((element) => {
        if (element.id === friendId) {
          throw new newError({
            error: 10202,
            message: "Already in friends list",
            data: [],
          });
        }
      });
      const result = await db.friendRequest.delete({
        where: {
          senderId_receiverId: {
            senderId: friendId,
            receiverId: userId,
          },
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createNewUser(email, password, name, age, gender) {
    try {
      const result = await db.user.create({
        data: {
          email: email,
          password: password,
          name: name,
          profile: {
            create: {
              bio: "nothing",
              gender: gender,
              age: age,
              avatar: "http://localhost:8080/images/profile/noAvatar.png",
              wallpaper: "http://localhost:8080/images/profile/noCover.png",
              description: "i'm human",
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
            select: {
              likes: true,
              comments: true,
              listShare: true,
            },
          },
          comments: {
            orderBy: {
              updatedAt: "desc",
            },
            include: {
              likes: {
                select: {
                  author: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
          likes: {
            select: {
              author: {
                select: {
                  id: true,
                },
              },
            },
          },
          author: {
            select: {
              id: true,
            },
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
            select: {
              likes: true,
              comments: true,
              listShare: true,
            },
          },
          comments: {
            orderBy: {
              updatedAt: "desc",
            },
            include: {
              likes: {
                select: {
                  author: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
          likes: {
            select: {
              author: {
                select: {
                  id: true,
                },
              },
            },
          },
          author: {
            select: {
              id: true,
            },
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
            select: {
              likes: true,
              comments: true,
              listShare: true,
            },
          },
          comments: {
            orderBy: {
              updatedAt: "desc",
            },
            include: {
              likes: {
                select: {
                  author: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
          likes: {
            select: {
              author: {
                select: {
                  id: true,
                },
              },
            },
          },
          author: {
            select: {
              id: true,
            },
          },
          sharedFrom: true,
        },
      });
      return posts;
    } catch (error) {
      throw error;
    }
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

  async sendFriendRequest(userId, friendId) {
    try {
      if (userId === friendId) {
        throw new newError({
          error: 10203,
          message: "You cannot add yourself to your friends list",
          data: [],
        });
      }

      const friend = await this.getUserById(friendId);
      if (friend === null) {
        throw new newError({
          error: 10201,
          message: "Friend not found",
          data: [],
        });
      }

      const friendList = await this.getUserFriendList(userId);
      friendList.forEach((element) => {
        if (element.id === friendId) {
          throw new newError({
            error: 10202,
            message: "Already in friends list",
            data: [],
          });
        }
      });

      const sentFriendRequest = await this.getSentFriendRequest(userId);
      sentFriendRequest.forEach((element) => {
        if (element.receiverId === friendId) {
          throw new newError({
            error: 10204,
            message: "Already sent friend request to this user",
            data: [],
          });
        }
      });

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
    } catch (error) {
      throw error;
    }
  }

  async acceptFriendRequest(userId, friendId) {
    try {
      if (userId === friendId) {
        throw new newError({
          error: 10203,
          message: "You cannot add yourself to your friends list",
          data: [],
        });
      }

      const friend = await this.getUserById(friendId);
      if (friend === null) {
        throw new newError({
          error: 10201,
          message: "Friend not found",
          data: [],
        });
      }

      const friendList = await this.getUserFriendList(userId);
      friendList.forEach((element) => {
        if (element.id === friendId) {
          throw new newError({
            error: 10202,
            message: "Already in friends list",
            data: [],
          });
        }
      });

      const receivedFriendRequest = await this.getFriendRequest(userId);
      let isReceived = false;
      receivedFriendRequest.forEach((element) => {
        if (element.senderId === friendId) {
          isReceived = true;
        }
      });
      if (!isReceived) {
        throw new newError({
          error: 10206,
          message: "No friend request from this user",
          data: [],
        });
      }

      await db.friendRequest.delete({
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
    } catch (error) {
      throw error;
    }
  }

  async removeFriend(userId, friendId) {
    try {
      if (userId === friendId) {
        throw new newError({
          error: 10203,
          message: "You cannot remove yourself",
          data: [],
        });
      }

      const friend = await this.getUserById(friendId);
      if (friend === null) {
        throw new newError({
          error: 10201,
          message: "Friend not found",
          data: [],
        });
      }

      const friendList = await this.getUserFriendList(userId);
      let isFriend = false;
      friendList.forEach((element) => {
        if (element.id === friendId) {
          isFriend = true;
        }
      });
      if (!isFriend) {
        throw new newError({
          error: 10205,
          message: "User not in friends list",
          data: [],
        });
      }

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
    } catch (error) {
      throw error;
    }
  }
  async getDescription(userId) {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        name: true,
        profile: {
          select: {
            description: true,
            avatar: true,
          },
        },
      },
    });
    return user;
  }
  async getRelationship(userId, friendId) {
    const friendList = await this.getUserFriendList(userId);
    let isFriend = false;
    friendList.forEach((element) => {
      if (element.id === friendId) {
        isFriend = true;
      }
    });
    if (isFriend) {
      return "Friends";
    }
    const sentFriendRequest = await this.getSentFriendRequest(userId);
    let isSent = false;
    sentFriendRequest.forEach((element) => {
      if (element.receiverId === friendId) {
        isSent = true;
      }
    });
    if (isSent) {
      return "Sent";
    }
    const receivedFriendRequest = await this.getFriendRequest(userId);
    let isReceived = false;
    receivedFriendRequest.forEach((element) => {
      if (element.senderId === friendId) {
        isReceived = true;
      }
    });
    if (isReceived) {
      return "Received";
    }
    return "None";
  }
  async cancelFriendRequest(userId, friendId) {
    try {
      if (userId === friendId) {
        throw new newError({
          error: 10203,
          message: "You cannot cancel friend request to yourself",
          data: [],
        });
      }

      const friend = await this.getUserById(friendId);
      if (friend === null) {
        throw new newError({
          error: 10201,
          message: "Friend not found",
          data: [],
        });
      }

      const sentFriendRequest = await this.getSentFriendRequest(userId);
      let isSent = false;
      sentFriendRequest.forEach((element) => {
        if (element.receiverId === friendId) {
          isSent = true;
        }
      });
      if (!isSent) {
        throw new newError({
          error: 10207,
          message: "No friend request sent to this user",
          data: [],
        });
      }

      await db.friendRequest.delete({
        where: {
          senderId_receiverId: {
            senderId: userId,
            receiverId: friendId,
          },
        },
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new userQueries();
