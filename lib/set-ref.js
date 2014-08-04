var set = require('./set');
/**
 * @memberof module:OPL~setRef
 * @function
 * @param {Object} obj
 * @param {module:OPL~Path} path
 * @param {module:OPL~Path} ref
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function setRef (obj, path, ref) {
    return set(obj, path, { '@ref': ref });
};
