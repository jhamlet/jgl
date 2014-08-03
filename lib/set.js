var setPath = require('./set-path'),
    _ = require('underscore');
/**
 * @member module:OPL.set
 * @function
 * @param {Object} obj
 * @param {...module:OPL~PathValue} pathValue
 * @returns {Array<module:OPL~PathValue>} The array of {@link module:OPL~PathValue}'s
 * that were set on the obj
 */
module.exports = function set (obj) {
    return _.
        rest(arguments, 1).
        reduce(function (acc, pv) {
            return acc.concat(setPath(obj, pv[0], pv[1]));
        }, []);
};

