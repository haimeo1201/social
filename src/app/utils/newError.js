/**
 * Error format.
 *
 * Parameter in constructor is error object.
 * {
 *      error,
 *      message,
 *      data,
 * }
 */
class newError extends Error {
    constructor(errorBody) {
        super();

        this.error = errorBody.error;
        this.message = errorBody.message;
        this.data = errorBody.data;
    }
}

module.exports = newError;
