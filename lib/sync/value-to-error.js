var ERROR_KEY = require('./error-key'),
    globals = this;
/**
 * @member module:JGL.valueToError
 * @function
 * @param {Object} value
 * @returns {Error}
 */
module.exports = function valueToError (value) {
    var e = value[ERROR_KEY],
        name,
        error;

    if (e) {
        name = e.name;
        error = Object.create((globals[name] || Error.prototype));
        error.name = name;
        error.message = e.message;
        error.stack = e.stack;
    }

    return error || value;
};
