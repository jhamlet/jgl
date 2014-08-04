var traverse = require('./traverse'),
    _ = require('underscore');
/**
 * @member module:OPL.set
 * @function
 * @param {Object} graph
 * @param {...module:OPL~PathValue} pathValue
 * @returns {Array<module:OPL~PathValue>} The array of {@link module:OPL~PathValue}'s
 * that were set on the graph
 */
module.exports = function set (graph) {
    return _.
        rest(arguments, 1).
        reduce(function (acc, pv) {
            var path = pv.path,
                propIdx = path.length - 1,
                prop = path[propIdx],
                // We grab everything up to the end of the given path.
                // We append 'null' so we will grab the actual end point of any
                // references found
                upto = path.slice(0, propIdx).concat(null),
                result = traverse(graph, upto, true),
                idx = result.length - 1,
                last = result[idx],
                value = last.value;

            if (!(value instanceof Error)) {
                // Our last result would be our value path
                last.value = value[prop] = pv.value;
                last.path.push(prop);
            }

            return acc.concat(result);
        }, []);
};

