var set = require('./set');
/**
 * @memberof module:OPL~setRef
 * @function
 * @param {Object} graph
 * @param {module:OPL~Path} path
 * @param {module:OPL~Path} ref
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function setRef (graph, path, ref) {
    return set(graph, path, { '@ref': ref });
};
