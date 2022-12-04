const db = require("../db/config.js");

const getPost = async (req, res) => {
  const id = req.body.id;
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
    res.sendStatus(500);
  }
};

const addFriend = async (req, res) => {
  const friendId = req.body.id;
  const id = req.id;
  try {
    await db.user.update({});
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
module.exports = { getPost, addFriend };
