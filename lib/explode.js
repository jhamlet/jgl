var _ = require('underscore'),
    keysForSegment = require('./keys-for-segment');
/**
 * @member OPL.explode
 * @function
 * @param {Array<OPL~KeySegment>} path
 * @returns {Array<Array<Integer|String>>}
 */
function explode (path) {
    return path.
        reduce(function (acc, segment) {
            return _.
                chain(keysForSegment(segment)).
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
