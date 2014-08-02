var explode = require('./explode'),
    getPath = require('./get-path'),
    _ = require('underscore');
/**
 * @member module:OPL.get
 * @function
 * @param {Object} obj The source object to pull values from
 * @param {Array<module:OPL~Query>} paths The object paths to look up
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function get (obj, paths) {
    return paths.
        reduce(function (acc, query) {
            return explode(query).
                reduce(function (acc, path) {
                    return acc.
                        concat(getPath(obj, path));
                }, acc);
        }, []);
};

