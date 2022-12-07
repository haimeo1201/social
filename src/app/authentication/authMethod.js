const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const secretKey = "banxinhxinh";

exports.generateToken = async (payload, tokenLife) => {
  try {
    return await sign(
      {
        payload,
      },
      secretKey,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.verifyToken = async (token) => {
  try {
    return await verify(token, secretKey);
  } catch (error) {
    console.log(`Error in verify access token:  + ${error}`);
    return null;
  }
};
