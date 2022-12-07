const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);

/**
 * @param {*} schema required body schema
 * @param {*} request actual request body
 * @param {*} errorCode error code
 * @param {*} errorMessage error message
 * @returns Return error object if invalid, false if valid.
 */
function validateBodySchema(schema, request, errorCode, errorMessage) {
  try {
    const valid = ajv.validate(schema, request);

    if (!valid) {
      return {
        error: errorCode,
        message: errorMessage,
        data: ajv.errors,
      };
    }
  } catch (e) {
    console.log("Ajv error: " + e);
  }

  return false;
}

module.exports = validateBodySchema;
