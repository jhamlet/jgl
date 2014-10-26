var isRange = require('./is-range'),
    rangeContains = require('./range-contains'),
    segmentKeys = require('./segment-keys'),
    _ = require('underscore');
/**
 * @member module:JGL.segmentContains
 * @function
 * @param {module:JGL~QuerySegment} segment
 * @param {module:JGL~QueryKey|Array<module:JGL~QueryKey>} key
 * @returns {Boolean}
 */
module.exports = function segmentContains (segment, key) {
    segment = _.isArray(segment) ? segment : [segment];
    return _.isArray(key) ?
        segmentKeys(key).
            some(segmentContains.bind(null, segment))
        :
        segment.
            some(function (segKey) {
                var type = typeof segKey;

                if (type === 'string' || type === 'number') {
                    return key === segKey;
                }

                if (isRange(segKey)) {
                    return isRange(key) ?
                        segmentKeys(key).some(rangeContains.bind(null, segKey)) :
                        rangeContains(segKey, key);
                }

                return false;
            });
};

