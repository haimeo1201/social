const db = require("../db/config.js");
/**
 * Get all post of current user
 */
const getPost = async (req, res) => {
  const id = req.id;
  try {
    const post = await db.post.findMany({
      where: {
        authorId: id,
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
    res.json(post);
  } catch (e) {
    console.error(e);
    res.status(500).send("Something wrong while querying");
  }
};
/**
 * Add a user to friend lists and the other user also add you to their friend lists
 */

const addFriend = async (req, res) => {
  const friendId = req.body.id;
  const id = req.id;
  try {
    const user = await db.user.findFirst({
      where: {
        id: id,
      },
      include: {
        hasFriends: true,
      },
    });
    let friendList = [];
    user.hasFriends.forEach((element) => {
      friendList.push(element.id);
    });
    if (friendList.includes(friendId)) {
      res.status(201).send("User already added to friends list");
      return;
    }
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        hasFriends: {
          connect: {
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
          connect: {
            id: id,
          },
        },
      },
    });
    res.status(201).send("Add friend successfully");
  } catch (e) {
    console.error(e);
    res.status(500).send("Something wrong while querying");
  }
};

/**
 * Get your current friends lists
 */

const getFriendsList = async (req, res) => {
  const id = req.id;
  try {
    const user = await db.user.findFirst({
      where: {
        id: id,
      },
      include: {
        hasFriends: true,
      },
    });
    res.json(user.hasFriends);
  } catch (e) {
    console.error(e);
    res.status(500).send("Something wrong while querying");
  }
};
/**
 * Get the news feed provided by all of yours post and your friends'
 */

const getNewsFeed = async (req, res) => {
  const id = req.id;
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
      include: {
        hasFriends: true,
      },
    });
    let friendList = [];
    user.hasFriends.forEach((element) => {
      friendList.push(element.id);
    });
    friendList.push(user.id);
    const posts = await db.post.findMany({
      where: {
        authorId: { in: friendList },
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
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).send("Something wrong while querying");
  }
};
module.exports = { getPost, addFriend, getFriendsList, getNewsFeed };
