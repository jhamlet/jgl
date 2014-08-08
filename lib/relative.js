var segmentContains = require('./segment-contains');
/**
 * @member module:JGL.relative
 * @function
 * @param {module:JGL~Query} from
 * @param {module:JGL~Query} to
 * @returns {module:JGL~Query}
 */
module.exports = function relative (from, to) {
    var len = from.length,
        i = 0;

    for (; i < len; i++) {
        if (!segmentContains(from[i], to[i])) {
            break;
        }
    }

    return to.slice(i !== from.length ? 0 : i);
};

