const db = require("./database");
const newError = require("../utils/newError");

class postQueries {
  async addPost(authorId, content) {
    try {
      const result = await db.post.create({
        data: {
          content: content,
          authorId: authorId,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async addLikeToPost(authorId, postId) {
    try {
      const existedLike = await db.likes.findFirst({
        where: {
          postId: postId,
          authorId: authorId,
        },
      });

      if (existedLike !== null) {
        throw newError({
          error: 10301,
          message: "Already liked this post",
          data: [],
        });
      }

      const result = await db.likes.create({
        data: {
          postId: postId,
          authorId: authorId,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async addCommentToPost(authorId, postId, content) {
    try {
      const result = await db.comment.create({
        data: {
          authorId: authorId,
          content: content,
          postId: postId,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new postQueries();
