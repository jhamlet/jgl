var explode = require('./explode'),
    traverse = require('./traverse'),
    _ = require('underscore');
/**
 * @member module:JGL.get
 * @function
 * @param {Object} graph The source Object to pull values from
 * @param {...module:JGL~Query} path The Object paths to look up
 * @returns {Array<module:JGL~PathValue>}
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

