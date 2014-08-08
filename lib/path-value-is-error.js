var ERROR_KEY = require('./error-key');
/**
 * @member module:JGL.pathValueIsError
 * @function
 * @param {module:OPE~PathValue} pv
 * @returns {Boolean}
 */
module.exports = function pathValueIsError (pv) {
    var value = pv && pv.value;

    if (value) {
        return value instanceof Error || !!value[ERROR_KEY];
    }

    return false;
};
