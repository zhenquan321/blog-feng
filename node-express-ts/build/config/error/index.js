"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
/**
 * @export
 * @class HttpError
 * @extends {Error}
 */
class HttpError extends Error {
    /**
     * Creates an instance of HttpError.
     * @param {number} [status]
     * @param {string} [message]
     * @memberof HttpError
     */
    constructor(status, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
        this.name = this.name;
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
    }
}
exports.HttpError = HttpError;
exports.default = HttpError;
//# sourceMappingURL=index.js.map