var setPath = require('./set-path'),
    _ = require('underscore');
/**
 * @member module:OPL.set
 * @function
 * @param {Object} obj
 * @param {Array<module:OPL~PathValue>} pathValues
 * @returns {Array<module:OPL~PathValue>} The array of {@link module:OPL~PathValue}'s
 * that were set on the obj
 */
module.exports = function set (obj, pathValues) {
    return pathValues.
        reduce(function (acc, pv) {
            return acc.concat(setPath(obj, pv[0], pv[1]));
        }, []);
};

