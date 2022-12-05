const db = require("../db/config.js");
/**
 * Post something
 */
const addPost = async (req, res) => {
  const id = req.id;
  try {
    await db.post.create({
      data: {
        content: req.body.content,
        authorId: id,
      },
    });
    res.status(201).send("Add post successfully");
  } catch (e) {
    console.error(e);
    res.status(500).send("Something wrong while querying");
  }
};
/**
 * Like a post
 */

const addLike = async (req, res) => {
  const id = req.id;
  const postId = req.body.postId;
  try {
    const likes = db.likes.findFirst({
      where: {
        postId: postId,
        authorId: id,
      },
    });
    if (likes !== undefined) {
      res.status(201).send("Already liked this post");
      return;
    }
    await db.likes.create({
      data: {
        postId: postId,
        authorId: id,
      },
    });
    res.status(201).send("Liked post");
  } catch (e) {
    console.error(e);
    res.status(500).send("Something wrong while querying");
  }
};

/**
 * Comment a post
 */
const addComment = async (req, res) => {
  const id = req.id;
  const postId = req.body.postId;
  try {
    await db.comment.create({
      data: {
        authorId: id,
        content: req.body.content,
        postId: postId,
      },
    });
    res.status(201).send("Comment succesfully");
  } catch (e) {
    console.error(e);
    res.status(500).send("Something wrong while querying");
  }
};

module.exports = { addPost, addLike, addComment };
