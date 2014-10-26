var _ = require('underscore');
/**
 * @member module:JGL.segmentKeys
 * @function
 * @param {module:JGL~QuerySegment} segment
 * @returns {Array<Integer|String>}
 */
module.exports = function segmentKeys (segment) {
    var from, upto, result;

    if (segment && typeof segment === 'object') {
        if (_.isArray(segment)) {
            result = _.
                chain(segment).
                map(segmentKeys).
                flatten().
                value();
        }
        else {
            from = segment.from || 0;
            upto = segment.to + 1;
            if (from > upto) {
                throw new RangeError('JGL.segmentKeys(): \'from\' value should be less than \'to\' value.');
            }
            result = _.range(from, upto);
        }
    }
    else {
        result = [segment];
    }

    return _.uniq(result);
};

