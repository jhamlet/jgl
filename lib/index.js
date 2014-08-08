/**
 * An object that can be expanded into a series of indices
 * @typedef module:JGL~Range
 * @type {Object}
 * @property {Integer} [from=0]
 * @property {Integer} to
 */
/**
 * The smallest part of a concrete path
 * @typedef module:JGL~PathSegment
 * @type {Integer|String}
 */
/**
 * The smallest part of a complex query
 * @typedef module:JGL~QueryKey
 * @type {module:JGL~PathSegment|module:JGL~Range}
 */
/**
 * A query segment can contain one or more query keys
 * @typedef module:JGL~QuerySegment
 * @type {module:JGL~QueryKey|Array<module:JGL~QueryKey>}
 */
/**
 * A complex path query that can be expanded to get multiple concrete paths
 * @typedef module:JGL~Query
 * @type {Array<module:JGL~QuerySegment>}
 */
/**
 * A concrete path. i.e: One that can not be expanded further.
 * @typedef module:JGL~Path
 * @type {Array<module:JGL~PathSegment>}
 */
/**
 * @typedef module:JGL~PathValue
 * @type {Object}
 * @property {Array<module:JGL~Path>} path
 * @property {Mixed|Error} [value]
 * The returned value from following the path. If there was an error in processing
 * the path, the value will be an instance of Error. If undefined, it means the value
 * was removed from the graph at the given path.
 * @property {Array<module:JGL~Path>} [value.@ref]
 * Indicates that the node at the `path` in the JSONGraph is a reference to another
 * node. This proprety's value is a path that points back into the graph from the
 * root.
 * @property {Array<module:JGL~Path>} [value.@path]
 * Indicates that the value is derived from a reference, and indicates the real path
 * into the JSONGraph from the root. Only available on object-like nodes (Objects or
 * arrays, not strings, numbers, or booleans);
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
 * JSON Graph Language
 * @module JGL
 */
module.exports = /** @lends module:JGL. */{
    get:                require('./get'),
    set:                require('./set'),
    del:                require('./del'),
    equals:             require('./equals'),
    setRef:             require('./set-ref'),
    resolve:            require('./resolve'),
    traverse:           require('./traverse'),
    explode:            require('./explode'),
    relative:           require('./relative'),
    isRange:            require('./is-range'),
    isRelative:         require('./is-relative'),
    segmentKeys:        require('./segment-keys'),
    errorToValue:       require('./error-to-value'),
    valueToError:       require('./value-to-error'),
    rangeContains:      require('./range-contains'),
    pathValueIsRef:     require('./path-value-is-ref'),
    segmentContains:    require('./segment-contains'),
    pathValueIsError:   require('./path-value-is-error'),
    REF_KEY:            require('./ref-key'),
    ERROR_KEY:          require('./error-key')
};

