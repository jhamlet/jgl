var _ = require('underscore');
/**
 * @member module:OPL.delPath
 * @function
 * @param {Object} obj
 * @param {module:OPL~Path} path
 * @returns {module:OPL~PathValue}
 */
module.exports = function delPath (obj, path) {
    var ctx = obj,
        len = path.length - 1,
        i = 0,
        current = [],
        key,
        value;

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
                // A reference
                if (_.isArray(ctx) && i < len) {
                    return delPath(obj, ctx.concat(path.slice(i + 1)));
                }
            }
            catch (e) {
                return [[current, e]];
            }
        }
    }

    key = path[i];
    current.push(key);
    value = ctx[key];

    delete ctx[key];

    return [[current, value]];
};
