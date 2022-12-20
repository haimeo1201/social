const db = require("./database");
const newError = require("../utils/newError");

class postQueries {
  async getPostById(postId) {
    try {
      const result = await db.post.findUnique({
        where: {
          id: postId,
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

  async getCommentById(commentId, postId) {
    try {
      const result = await db.comment.findUnique({
        where: {
          id: commentId,
          postId: postId,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async addPost(authorId, content, attachment = null) {
    try {
      const result = await db.post.create({
        data: {
          content: content,
          authorId: authorId,
          attachments: attachment,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async removePost(postId) {
    try {
      const result = await db.post.delete({
        where: {
          id: postId,
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

  async removeCommentFromPost(commentId) {
    try {
      const result = await db.comment.delete({
        where: {
          id: commentId,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
  async toggleCommentLike(authorId, commentId) {
    try {
      const existedLike = await db.likes.findFirst({
        where: {
          commentId: commentId,
          authorId: authorId,
        },
      });
      const result = existedLike
        ? await db.likes.delete({
            where: {
              id: existedLike.id,
            },
          })
        : await db.likes.create({
            data: {
              commentId: commentId,
              authorId: authorId,
            },
          });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async togglePostLike(authorId, postId) {
    try {
      const existedLike = await db.likes.findFirst({
        where: {
          postId: postId,
          authorId: authorId,
        },
      });

      const result = existedLike
        ? await db.likes.delete({
            where: {
              id: existedLike.id,
            },
          })
        : await db.likes.create({
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
  async sharePost(authorId, postId, content) {
    try {
      const newPost = await db.post.create({
        data: {
          authorId: authorId,
          content: content,
          sharedId: postId,
        },
      });
      return newPost;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new postQueries();
