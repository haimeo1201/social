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
  async addLikeToPost(req, res) {
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
      const result = await postQueries.addLikeToPost(req.id, req.body.postId);

      res.json({
        error: 0,
        message: "Like post successfully",
        data: result,
      });
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
}

module.exports = new postController();
