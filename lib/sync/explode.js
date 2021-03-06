var segmentKeys = require('./segment-keys'),
    _ = require('underscore');
    
/**
 * Expand a path into all possible variations
 *
 * @example
 * JGL.explode([[1, 2], [3, 4], 5]);
 * //=> [
 * //      [1, 3, 5],
 * //      [2, 3, 5],
 * //      [1, 4, 5],
 * //      [2, 4, 5]
 * //   ]
 *
 * @member module:JGL.explode
 * @function
 * @param {module:JGL~Query} path
 * @returns {Array<module:JGL~Path>}
 */
function explode (path) {
    return path.
        reduce(function (acc, segment) {
            return _.
                chain(segmentKeys(segment)).
                map(function (key) {
                    return acc.
                        map(function (path) {
                            return path.concat(key);
                        });
                }).
                flatten(1).
                value();
        }, [[]]);
}

module.exports = explode;
