var traverse = require('./traverse'),
    _ = require('underscore');
/**
 * @member module:OPL.del
 * @function
 * @param {Object} graph
 * @param {...module:OPL~Path} path
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function del (graph) {
    return _.
        rest(arguments, 1).
        reduce(function (acc, path) {
            var propIdx = path.length - 1,
                prop = path[propIdx],
                // We grab everything up to the end of the given path.
                // We append 'null' no we will grab the actual end point of any
                // references found
                upto = path.slice(0, propIdx).concat(null),
                result = traverse(graph, upto),
                idx = result.length - 1,
                last = result[idx],
                value = last.value;

            if (!(value instanceof Error)) {
                delete value[prop];
                delete last.value;
                last.path = path;
            }

            return acc.concat(result);
        }, []);
};

