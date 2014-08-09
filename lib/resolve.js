var pathValueIsRef = require('./path-value-is-ref'),
    pathValueIsError = require('./path-value-is-error'),
    relative = require('./relative'),
    REF_KEY = require('./ref-key');
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
                acc.push(pv);
            }
            else if (pathValueIsRef(pv)) {
                if (ref) {
                    path = path.concat(relative(ref, pv.path));
                }
                else if (!ref) {
                    path = pv.path.slice();
                }
                ref = pv.value[REF_KEY];
            }
            else {
                path = path.concat(relative(ref, pv.path));
                acc.push({ path: path, value: pv.value });
                ref = null;
            }

            return acc;
        }, []);
};
