/**
 * @member module:OPL.errorToValue
 * @function
 * @param {Error}
 * @returns {Object}
 */
module.exports = function errorToValue (error) {
    return {
        '@error': {
            name: error.name,
            message: error.message,
            stack: error.
                stack.
                split('\n').
                map(function (line) { return line.replace(/^\s+/, ''); })
        }
    };
};
