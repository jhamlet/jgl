var _ = require('underscore');
/**
 * @member module:OPL.getPath
 * @function
 * @param {Object} obj
 * @param {module:OPL~Path} path
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function getPath (obj, path) {
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
                ctx = ctx === null ? undefined : ctx;
                ctx = ctx[key];
                // A reference?
                if (_.isArray(ctx) && i < len) {
                    return [[current, ctx]].
                        concat(getPath(obj, ctx.concat(path.slice(i + 1))));
                }
            }
            catch (e) {
                return [[current, e]];
            }
        }
    }

    return [[current, ctx]];
};
