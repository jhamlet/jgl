var REF_KEY = require('./ref-key');
/**
 * @member module:JGL.pathValueIsRef
 * @function
 * @param {module:JGL~PathValue} pv
 * @returns {Boolean}
 */
module.exports = function pathValueIsRef (pv) {
    return !!(pv && pv.value && pv.value[REF_KEY]);
};
