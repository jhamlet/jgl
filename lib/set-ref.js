var set = require('./set'),
    REF_KEY = require('./ref-key');
/**
 * @memberof module:JGL.setRef
 * @function
 * @param {Object} graph
 * @param {module:JGL~Path} path
 * @param {module:JGL~Path} ref
 * @returns {Array<module:JGL~PathValue>}
 */
module.exports = function setRef (graph, path, ref) {
    var value = {};

    value[REF_KEY] = ref;

    return set(graph, path, value);
};
