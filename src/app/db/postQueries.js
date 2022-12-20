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

    async removePost(reqId, reqRole, postId) {
        try {
            const post = await this.getPostById(postId);
            if (post === null) {
                throw new newError({
                    error: 10303,
                    message: "Post not found",
                    data: [],
                });
            } else {
                const authorId = post.authorId;

                let authorized = false;
                if (authorId === reqId || reqRole === "ADMIN") {
                    authorized = true;
                }

                if (!authorized) {
                    throw new newError({
                        error: 10302,
                        message: "You are not authorized to remove this post",
                        data: [],
                    });
                } else {
                    const result = await db.post.delete({
                        where: {
                            id: postId,
                        },
                    });

                    return result;
                }
            }
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

    async removeCommentFromPost(reqId, reqRole, commentId, postId) {
        try {
            const comment = await this.getCommentById(commentId, postId);
            if (comment === null) {
                throw new newError({
                    error: 10303,
                    message: "Comment not found",
                    data: [],
                });
            } else {
                const authorId = comment.authorId;
                const commentPostId = comment.postId;
                const post = await this.getPostById(commentPostId);
                const postAuthorId = post.authorId;

                let authorized = false;
                if (
                    authorId === reqId ||
                    postAuthorId === reqId ||
                    reqRole === "ADMIN"
                ) {
                    authorized = true;
                }

                if (!authorized) {
                    throw new newError({
                        error: 10302,
                        message:
                            "You are not authorized to remove this comment from post",
                        data: [],
                    });
                } else {
                    const result = await db.comment.delete({
                        where: {
                            id: commentId,
                        },
                    });

                    return result;
                }
            }
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

    async sharePost(authorId, postId, content) {
        try {
            const post = await this.getPostById(postId);
            if (post === null) {
                throw new newError({
                    error: 10303,
                    message: "Post not found",
                    data: [],
                });
            } else {
                let sharePostId =
                    post.sharedId === null ? postId : post.sharedId;

                const newPost = await db.post.create({
                    data: {
                        authorId: authorId,
                        content: content,
                        sharedId: sharePostId,
                    },
                });

                return newPost;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new postQueries();
