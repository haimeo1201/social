const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "My apis for socii",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.BACKEND_URL,
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
  apis: ["src/swagger/swagger-generate.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
