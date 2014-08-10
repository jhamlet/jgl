var JGL              = require('./'),
    pathValueIsRef   = require('./path-value-is-ref'),
    pathValueIsError = require('./path-value-is-error'),
    isRelative       = require('./is-relative'),
    relative         = require('./relative'),
    REF_KEY          = require('./ref-key');
/**
 * @member module:JGL.resolve
 * @function
 * @param {Array<module:JGL~PathValue>} pathValues
 * @returns {Array<module:JGL~PathValue>}
 */
module.exports = function resolve (pathValues) {
    var path, ref;

    return pathValues.
        reduce(function (acc, pv) {
            if (pathValueIsError(pv)) {
                if (ref) {
                    if (isRelative(ref, pv.path)) {
                        path = path.concat(JGL.LAST_RELATIVE_PATH);
                    }
                    acc.push({ path: path, value: pv.value });
                    ref = null;
                }
                else {
                    acc.push(pv);
                }
            }
            else if (pathValueIsRef(pv)) {
                path = ref ?
                    path.concat(relative(ref, pv.path)) :
                    pv.path.slice();
                ref = pv.value[REF_KEY];
            }
            else {
                path = path ?
                    path.concat(ref ? relative(ref, pv.path) : pv.path) :
                    pv.path;
                acc.push({ path: path, value: pv.value });
                path = null;
                ref = null;
            }

            return acc;
        }, []);
};
