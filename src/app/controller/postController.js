const validateBodySchema = require("../utils/validateBodySchema");

const postQueries = require("../db/postQueries");

class postController {
    /** [POST] */
    async addPost(req, res) {
        const bodySchema = {
            type: "object",
            properties: {
                content: {
                    type: "string",
                },
            },
            required: ["content"],
        };

        const invalid = validateBodySchema(
            bodySchema,
            req.body,
            10300,
            "Invalid add post request body"
        );

        if (invalid !== false) {
            res.json(invalid);

            return;
        }

        try {
            const result = await postQueries.addPost(req.id, req.body.content);

            res.json({
                error: 0,
                message: "Add post successfully",
                data: result,
            });
        } catch (error) {
            res.json(error);
        }
    }

    /** [POST] */
    async removePost(req, res) {
        const bodySchema = {
            type: "object",
            properties: {
                postId: {
                    type: "integer",
                },
            },
            required: ["postId"],
        };

        const invalid = validateBodySchema(
            bodySchema,
            req.body,
            10300,
            "Invalid remove post request body"
        );

        if (invalid !== false) {
            res.json(invalid);

            return;
        }

        try {
            const post = await postQueries.getPostById(req.body.postId);

            if (post === null) {
                res.json({
                    error: 10303,
                    message: "Post not found",
                    data: [],
                });

                return;
            }

            const authorId = post.authorId;
            if (authorId === req.id || req.role === "ADMIN") {
                const result = await postQueries.removePost(req.body.postId);

                res.json({
                    error: 0,
                    message: "Remove post successfully",
                    data: result,
                });
            } else {
                res.json({
                    error: 10302,
                    message: "You are not authorized to remove this post",
                    data: [],
                });
            }
        } catch (error) {
            res.json(error);
        }
    }

    /** [POST] */
    async addCommentToPost(req, res) {
        const bodySchema = {
            type: "object",
            properties: {
                content: {
                    type: "string",
                },
                postId: {
                    type: "integer",
                },
            },
            required: ["content", "postId"],
        };

        const invalid = validateBodySchema(
            bodySchema,
            req.body,
            10300,
            "Invalid comment to post request body"
        );

        if (invalid !== false) {
            res.json(invalid);

            return;
        }

        try {
            const result = await postQueries.addCommentToPost(
                req.id,
                req.body.postId,
                req.body.content
            );

            res.json({
                error: 0,
                message: "Comment to successfully",
                data: result,
            });
        } catch (error) {
            res.json(error);
        }
    }

    /** [POST] */
    async removeCommentFromPost(req, res) {
        const bodySchema = {
            type: "object",
            properties: {
                commentId: {
                    type: "integer",
                },
                postId: {
                    type: "integer",
                },
            },
            required: ["commentId"],
        };

        const invalid = validateBodySchema(
            bodySchema,
            req.body,
            10300,
            "Invalid remove comment from post request body"
        );

        if (invalid !== false) {
            res.json(invalid);

            return;
        }

        try {
            const comment = await postQueries.getCommentById(
                req.body.commentId,
                req.body.postId
            );

            if (comment === null) {
                res.json({
                    error: 10303,
                    message: "Comment not found",
                    data: [],
                });

                return;
            }

            const authorId = comment.authorId;
            const postId = comment.postId;
            const post = await postQueries.getPostById(postId);
            const postAuthorId = post.authorId;
            if (
                authorId === req.id ||
                postAuthorId === req.id ||
                req.role === "ADMIN"
            ) {
                const result = await postQueries.removeCommentFromPost(
                    req.body.commentId
                );

                res.json({
                    error: 0,
                    message: "Remove comment from post successfully",
                    data: result,
                });
            } else {
                res.json({
                    error: 10302,
                    message:
                        "You are not authorized to remove this comment from post",
                    data: [],
                });
            }
        } catch (error) {
            res.json(error);
        }
    }

    /** [POST] */
    async togglePostLike(req, res) {
        const bodySchema = {
            type: "object",
            properties: {
                postId: {
                    type: "integer",
                },
            },
            required: ["postId"],
        };

        const invalid = validateBodySchema(
            bodySchema,
            req.body,
            10300,
            "Invalid like post request body"
        );

        if (invalid !== false) {
            res.json(invalid);

            return;
        }

        try {
            const result = await postQueries.togglePostLike(
                req.id,
                req.body.postId
            );
            console.log(result);

            res.json({
                error: 0,
                message: "Like status changed successfully",
                data: result,
            });
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = new postController();
