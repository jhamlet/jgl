var explode = require('./explode'),
    segmentContains = require('./segment-contains'),
    _ = require('underscore');
/**
 * @member module:OPL.relative
 * @function
 * @param {module:OPL~Path} from
 * @param {module:OPL~Path} to
 * @returns {module:OPL~Path}
 */
module.exports = function relPath (from, to) {
    var len = from.length,
        i = 0;

    for (; i < len; i++) {
        if (from[i] !== to[i]) {
            break;
        }
    }

    return to.slice(i);
};

