var _ = require('underscore');
/**
 * @member module:OPL.set
 * @function
 * @param {Object} obj
 * @param {Array<module:OPL~PathValue>} pvs
 * @returns {Array<module:OPL~PathValue>} The array of {@link module:OPL~PathValue}
 * that were set on the obj
 */
module.exports = function set (obj, pvs) {
    return pvs.
        map(function (pv) {
            var path = pv[0],
                value = pv[1],
                ctx = obj,
                len = path.length,
                i = 0,
                key;

            if (typeof value === 'undefined' || value instanceof Error) {
                return pv;
            }

            for (; i < len; i ++) {
                key = path[i];
                if (typeof ctx[key] === 'undefined') {
                    ctx[key] = i === len - 1 ? value : {};
                }
                ctx = ctx[key];
            }

            return pv;
        });
};
