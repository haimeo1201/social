const express = require("express");
const app = express();
const cors = require("cors");
const cookies = require("cookie");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/posts.js");
const userRouter = require("./routes/users.js");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "My apis in swaager",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(cors());
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(8080, () => {
  console.log("listen at port 8080");
});
