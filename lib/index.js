/**
 * An object that can be expanded into a series of indices
 * @typedef module:OPL~Range
 * @type {Object}
 * @property {Integer} [from=0]
 * @property {Integer} to
 */
/**
 * The smallest part of a concrete path
 * @typedef module:OPL~PathSegment
 * @type {Integer|String}
 */
/**
 * The smallest part of a complex query
 * @typedef module:OPL~QueryKey
 * @type {module:OPL~PathSegment|module:OPL~Range}
 */
/**
 * A query segment can contain one or more query keys
 * @typedef module:OPL~QuerySegment
 * @type {module:OPL~QueryKey|Array<module:OPL~QueryKey>}
 */
/**
 * A complex path query that can be expanded to get multiple concrete paths
 * @typedef module:OPL~Query
 * @type {Array<module:OPL~QuerySegment>}
 */
/**
 * A concrete path. i.e: One that can not be expanded further.
 * @typedef module:OPL~Path
 * @type {Array<module:OPL~PathSegment>}
 */
/**
 * @typedef module:OPL~PathValue
 * @type {Object}
 * @property {Array<module:OPL~Path>} path
 * @property {Mixed|Error} [value]
 * The returned value from following the path. If there was an error in processing
 * the path, the value will be an instance of Error. If undefined, it means the value
 * was removed from the graph at the given path.
 * @property {Array<module:OPL~Path>} [value.@ref]
 * Indicates that the value is a reference, and this path points back into the
 * JSONGraph from the root.
 * @property {Object} [value.@error]
 * Indicates that the path resulted in an error and was transformed into a normal
 * object. Useful for serializing and deserializing over the wire
 * @property {String} [value.@error.name]
 * The name of the original error
 * @property {String} [value.@error.message]
 * The original error message
 * @property {Array<String>} [value.@error.stack]
 * The original error stack
 */
/**
 * Object Path Language
 * @module OPL
 */
module.exports = /** @lends module:OPL. */{
    get:                require('./get'),
    set:                require('./set'),
    del:                require('./del'),
    setRef:             require('./set-ref'),
    traverse:           require('./traverse'),
    explode:            require('./explode'),
    relative:           require('./relative'),
    isRange:            require('./is-range'),
    segmentKeys:        require('./segment-keys'),
    errorToValue:       require('./error-to-value'),
    valueToError:       require('./value-to-error'),
    rangeContains:      require('./range-contains'),
    segmentContains:    require('./segment-contains'),
    REF_KEY:            require('./ref-key'),
    ERROR_KEY:          require('./error-key')
};

