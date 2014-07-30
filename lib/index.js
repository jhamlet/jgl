var _ = require('underscore');
/**
 * @typedef module:OPL~Range
 * @type {Object}
 * @property {Integer} from
 * @property {Integer} to
 */
/**
 * @typedef module:OPL~QueryKey
 * @type {Integer|String|module:OPL~Range}
 */
/**
 * @typedef module:OPL~PathSegment
 * @type {Integer|String}
 */
/**
 * @typedef module:OPL~QuerySegment
 * @type {module:OPL~QueryKey|Array<module:OPL~QueryKey>}
 */
/**
 * @typedef module:OPL~Query
 * @type {Array<module:OPL~QuerySegment>}
 */
/**
 * @typedef module:OPL~Path
 * @type {Array<module:OPL~PathSegment>}
 */
/**
 * @typedef module:OPL~PathValue
 * @type {Array<module:OPL~Path, Mixed|Error>}
 */
/**
 * Object Path Language
 * @module OPL
 */
module.exports = /** @lends module:OPL. */{
    segmentKeys: require('./segment-keys'),
    explode: require('./explode'),
    get: require('./get'),
    set: require('./set')
};

