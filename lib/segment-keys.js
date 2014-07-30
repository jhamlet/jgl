var _ = require('underscore');
/**
 * @typedef OPL~Range
 * @type {Object}
 * @property {Integer} from
 * @property {Integer} to
 */
/**
 * @typedef OPL~Segment
 * @type {Integer|String|OPL~Range|Array<OPL~Segment>}
 */
/**
 * @member OPL.segmentKeys
 * @function
 * @param {OPL~Segment} segment
 * @returns {Array<Integer|String>}
 */
function segmentKeys (segment) {
    var from, upto, by,
        result;

    if (segment && typeof segment === 'object') {
        if (segment instanceof Array) {
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
                throw new RangeError('OPL.segmentKeys(): \'from\' value should be less than \'to\' value.');
            }
            result = _.range(from, upto);
        }
    }
    else {
        result = [segment];
    }

    return result;
}

module.exports = segmentKeys;

