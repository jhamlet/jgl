var _ = require('underscore');
/**
 * @member module:OPL.setPath
 * @function
 * @param {Object} obj
 * @param {module:OPL~Path}
 * @param {Mixed} value
 * @returns {module:OPL~PathValue}
 */
module.exports = function setPath (obj, path, value) {
    var ctx = obj,
        len = path.length,
        lastIdx = len - 1,
        i = 0,
        current = [],
        key;

    for (i; i < len; i++) {
        key = path[i];

        if (key !== undefined && key !== null) {
            current.push(key);

            try {
                ctx = ctx === null ? undefined : ctx;
                if (ctx[key] === undefined) {
                    ctx[key] = i === lastIdx ? value : {};
                }
                ctx = ctx[key];
                // Follow references only if we are not on the last key of the path
                if (_.isArray(ctx) && i < lastIdx) {
                    return [[current, ctx]].
                        concat(setPath(obj, ctx.concat(path.slice(i + 1)), value));
                }
            }
            catch (e) {
                return [[current, e]];
            }
        }
    }

    // console.log('path: %j, value: %j', current, ctx);
    return [[current, ctx]];
};
