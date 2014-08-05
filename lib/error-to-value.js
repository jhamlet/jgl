var ERROR_KEY = require('./error-key');
/**
 * @member module:OPL.errorToValue
 * @function
 * @param {Error}
 * @returns {Object}
 */
module.exports = function errorToValue (error) {
    var value = {};

    value[ERROR_KEY] = {
        name: error.name,
        message: error.message,
        stack: error.
            stack.
            split('\n').
            map(function (line) { return line.replace(/^\s+/, ''); })
    };

    return value;
};
