var set = require('./set'),
    REF_KEY = require('./ref-key');
/**
 * @memberof module:OPL~setRef
 * @function
 * @param {Object} graph
 * @param {module:OPL~Path} path
 * @param {module:OPL~Path} ref
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function setRef (graph, path, ref) {
    var value = {};

    value[REF_KEY] = ref;

    return set(graph, path, value);
};
