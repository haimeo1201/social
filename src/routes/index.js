const swaggerUI = require("swagger-ui-express");

const authRoute = require("./auth");
const userRoute = require("./user");
const postRoute = require("./post");

const specs = require("../swagger/swagger");

function routes(app) {
    app.use("/api/auth", authRoute);
    app.use("/api/user", userRoute);
    app.use("/api/post", postRoute);

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}

module.exports = routes;
