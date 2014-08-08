var traverse = require('./traverse'),
    explode = require('./explode');
/**
 * @member module:JGL.resolve
 * @function
 * @param {Object} graph The object to traverse
 * @param {module:JGL~Query} query The query paths to follow
 * @returns {Array<module:JGL~PathValue>}
 */
module.exports = function resolve (graph, query) {
    return explode(query).
        reduce(function (acc, path) {
            // Add null to punch-through references
            var pvs = traverse(graph, path.concat(null)),
                len = pvs.length,
                lastIdx = len - 1,
                lastPv = pvs[lastIdx],
                pv;

            acc = acc.concat(pvs.slice(0, lastIdx));

            if (len > 1 && lastPv.value !== undefined) {
                pv = { path: path, value: lastPv.value };
                pv.value['@path'] = lastPv.path;
            }

            return acc.concat(pv ? pv : lastPv);
        }, []);
};
