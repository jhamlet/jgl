var protean = require('protean'),
    classify = protean.classify,
    JGL = require('../../'),
    _ = require('underscore');
//------------------------------------------------------------------------------
// Internal Types
//------------------------------------------------------------------------------
/**
 * @typedef PatternJGLModelParser~Argument
 * @type {String|String[]|Integer|Integer[]|module:JGLModel~Range|PatternJGLModelParser.KEYS|PatternJGLModelParser.INTEGERS}
 */
/**
 * @typedef PatternJGLModelParser~Pattern
 * @type {Array<PatternJGLModelParser~Argument>}
 */
//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------
/**
 * @class PatternJGLModelParser
 * @param {...PatternJGLModelParser~Argument} segment
 */
function PatternJGLModelParser () {
    /**
     * @member PatternJGLModelParser#segments
     * @property {Array<Function>}
     */
    this.segments =
        _.rest(arguments, 0).
            map(PatternJGLModelParser._mapArgument);
}
//------------------------------------------------------------------------------
// Static Members
//------------------------------------------------------------------------------
Object.defineProperties(PatternJGLModelParser,
    /** @lends PatternJGLModelParser **/{
    /**
     * @constant
     */
    KEYS: { value: 'keys', enumerable: true, configurable: false },
    /**
     * @constant
     */
    INTEGERS: { value: 'integers', enumerable: true, configurable: false }
});

_.extend(PatternJGLModelParser,/** @lends PatternJGLModelParser **/{
    /**
     * Determines if the given value is an integer.
     * @param {Mixed} val
     * @returns {Boolean}
     */
    isInteger: function (val) { return parseInt(val, 10) === val; },
    /**
     * Determines if the given value is an array of integers.
     * @param {Mixed} val
     * @returns {Boolean}
     */
    isIntegers: function (val) {
        return (_.isArray(val) ? val : [val]).every(PatternJGLModelParser.isInteger);
    },
    /**
     * Determines is the given value is a range.
     * @param {Mixed} val
     * @returns {Boolean}
     */
    isRange: function (val) { return JGL.isRange(val); },
    /**
     * Determines if the given value is an integer or a range
     * @param {Mixed} val
     * @returns {Boolean}
     */
    isIntegersOrRange: function (val) {
        return PatternJGLModelParser.isRange(val) || PatternJGLModelParser.isIntegers(val);
    },
    /**
     * Determines is the given value is a string key
     * @param {Mixed} val
     * @returns {Boolean}
     */
    isKey: function (val) { return typeof val === 'string'; },
    /**
     * Determines if the given val is an array of keys.
     * @param {Mixed} val
     * @returns {Boolean}
     */
    isKeys: function (val) {
        val = _.isArray(val) ? val : [val];
        return val.every(PatternJGLModelParser.isKey); },
    /**
     * @private
     * @param {PatternJGLModelParser~Argument}
     * @returns {Function}
     * @throws {Error} If given an unknown argument type
     */
    _mapArgument: function (segment) {
        // First check to see if the segment is one of our constants
        switch (segment) {
        case PatternJGLModelParser.INTEGERS:
            return function (val) {
                return !!(PatternJGLModelParser.isIntegersOrRange(val)) &&
                    JGL.segmentKeys(val);
            };
        case PatternJGLModelParser.KEYS:
            return function (val) {
                return !!PatternJGLModelParser.isKeys(val) && JGL.segmentKeys(val);
            };
        }
        // Now try for some other options
        if (_.isArray(segment) && PatternJGLModelParser.isKeys(segment)) {
            return function (val) {
                var result =
                        (_.isArray(val) ? val : [val]).
                        reduce(function (acc, part) {
                            if (JGL.segmentContains(segment, part)) {
                                acc = acc || [];
                                acc.push(part);
                            }
                            return acc;
                        }, []);
                return !!result.length && result;
            };
        }
        else if (PatternJGLModelParser.isKey(segment) || PatternJGLModelParser.isInteger(segment)) {
            return function (val) {
                return val === segment && [segment];
            };
        }
        // Otherwise, throw an error
        throw new Error('Unknown key segment type \'' + segment + '\'');
    }
});
//------------------------------------------------------------------------------
// Instance Members
//------------------------------------------------------------------------------
module.exports = classify(PatternJGLModelParser,
    /** @lends PatternJGLModelParser# */{
    /**
     * Takes in a {@link module:JGLModel~Query} and returns a list of keys matched for
     * each segment of the query. If the parser does not match the query, false is
     * returned.
     * @param {module:JGL~Query} query
     * @returns {Array<Array<String|Integer>>|Boolean}
     */
    match: function (query) {
        var segments = this.segments,
            results;

        if (query.length < segments.length) { return false; }

        return (
            results =
                segments.
                    reduce(function (acc, segment, idx) {
                        var r = segment(query[idx]);
                        r !== false && acc.push(r);
                        return acc;
                    }, [])
            ) &&
            results.length === segments.length &&
            results;
    }
});

