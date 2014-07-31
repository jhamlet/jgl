var explode = require('./explode'),
    _ = require('underscore');
/**
 * @param {Object} obj
 * @param {module:OPL~Path} path
 * @returns {Array<module:OPL~PathValue>}
 */
function getPath (obj, path) {
    var ctx = obj,
        len = path.length,
        i = 0,
        current = [],
        key;

    for (; i < len; i++) {
        key = path[i];
        if (key !== undefined && key !== null) {
            if (ctx === undefined) {
                break;
            }

            current.push(key);

            try {
                ctx = ctx !== null ? ctx : undefined;
                ctx = ctx[key];
                // A reference?
                if (_.isArray(ctx) && i < len) {
                    return [[current, ctx]].
                        concat(getPath(obj, ctx.concat(path.slice(i + 1))));
                }
            }
            catch (e) {
                ctx = e;
                break;
            }
        }
    }

    return [[current, ctx]];
}
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

