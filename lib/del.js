var explode = require('./explode'),
    delPath = require('./del-path'),
    _ = require('underscore');
/**
 * @member module:OPL.del
 * @function
 * @param {Object} obj
 * @param {Array<module:OPL~Query>} paths
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function del (obj, paths) {
    return paths.
        reduce(function (acc, query) {
            return explode(query).
                reduce(function (acc, path) {
                    return acc.concat(delPath(obj, path));
                }, acc);
        }, []);
};

