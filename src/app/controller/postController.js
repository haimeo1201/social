const validateBodySchema = require("../utils/validateBodySchema");

const postQueries = require("../db/postQueries");

class postController {
  async getPostById(req, res) {
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
      "Invalid get post by id request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      const result = await postQueries.getPostById(req.body.postId);
      res.json({
        error: 0,
        message: "Get post successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

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
      const result = req.file
        ? await postQueries.addPost(req.id, req.body.content, req.file.filename)
        : await postQueries.addPost(req.id, req.body.content);
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
      const result = await postQueries.removePost(
        req.id,
        req.role,
        req.body.postId
      );

      res.json({
        error: 0,
        message: "Remove post successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [POST] */
  async addCommentToPost(req, res) {
    req.body.postId = parseInt(req.body.postId);
    const bodySchema = {
      type: "object",
      properties: {
        content: {
          type: "string",
        },
        postId: {
          type: "integer",
        },
        type: {
          type: "string",
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
        req.body.content,
        req.file ? req.file.filename : null
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
      const result = await postQueries.removeCommentFromPost(
        req.id,
        req.role,
        req.body.commentId,
        req.body.postId
      );

      res.json({
        error: 0,
        message: "Remove comment from post successfully",
        data: result,
      });
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
      const result = await postQueries.togglePostLike(req.id, req.body.postId);

      res.json({
        error: 0,
        message: "Like status changed successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [POST] */
  async toggleCommentLike(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        commentId: {
          type: "integer",
        },
      },
      required: ["commentId"],
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
      const result = await postQueries.toggleCommentLike(
        req.id,
        req.body.commentId
      );

      res.json({
        error: 0,
        message: "Like status changed successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [POST] */
  async checkPostLike(req, res) {
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
      "Invalid check post like status request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      const result = await postQueries.checkPostLike(req.id, req.body.postId);

      res.json({
        error: 0,
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [POST] */
  async checkCommentLike(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        commentId: {
          type: "integer",
        },
      },
      required: ["commentId"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10300,
      "Invalid check comment like status request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }

    try {
      const result = await postQueries.checkCommentLike(
        req.id,
        req.body.commentId
      );

      res.json({
        error: 0,
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }

  /** [POST] */
  async sharePost(req, res) {
    const bodySchema = {
      type: "object",
      properties: {
        postId: {
          type: "integer",
        },
        content: {
          type: "string",
        },
      },
      required: ["postId", "content"],
    };

    const invalid = validateBodySchema(
      bodySchema,
      req.body,
      10300,
      "Invalid share post request body"
    );

    if (invalid !== false) {
      res.json(invalid);

      return;
    }
    try {
      const result = await postQueries.sharePost(
        req.id,
        req.body.postId,
        req.body.content
      );

      res.json({
        error: 0,
        message: "Share post successfully",
        data: result,
      });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new postController();
