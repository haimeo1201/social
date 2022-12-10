const authMethod = require("./authMethod");
const userQueries = require("../db/userQueries");

exports.isAuth = async (req, res, next) => {
    var accessTokenFromHeader = req.header("Authorization");

    if (!accessTokenFromHeader) {
        res.json({
            error: 10105,
            message: "Access token not found",
            data: [],
        });
        return;
    }

    if (accessTokenFromHeader.split(" ")[0] === "Bearer") {
        accessTokenFromHeader = accessTokenFromHeader.split(" ")[1];
    }

    const verified = await authMethod.verifyToken(accessTokenFromHeader);

    if (!verified) {
        res.json({
            error: 10106,
            message: "You don't have permission to access this content",
            data: [],
        });
        return;
    }

    req.id = verified.payload.id;
    req.role = verified.payload.role;

    return next();
};

/**
 * isAdmin must stand behind isAuth
 */
exports.isAdmin = async (req, res, next) => {
    var role = req.role;

    if (role !== "ADMIN") {
        res.json({
            error: 10107,
            error_type: "Must be admin",
            data: [],
        });
        return;
    }

    return next();
};
