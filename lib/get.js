var explode = require('./explode'),
    traverse = require('./traverse'),
    _ = require('underscore');
/**
 * @member module:OPL.get
 * @function
 * @param {graphect} graph The source graphect to pull values from
 * @param {...module:OPL~Query} path The graphect paths to look up
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function get (graph) {
    return _.
        rest(arguments, 1).
        reduce(function (acc, query) {
            return explode(query).
                reduce(function (acc, path) {
                    return acc.
                        // we append 'null' to punch-through trailing references
                        concat(traverse(graph, path.concat(null)));
                }, acc);
        }, []);
};

