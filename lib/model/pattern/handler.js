var protean = require('protean'),
    classify = protean.classify,
    Parser = require('./parser');
//------------------------------------------------------------------------------
// Internal Types
//------------------------------------------------------------------------------
/**
 * @typedef PatternJGLModelHandler~Action
 * @type {Function}
 * @param {Array<Array<Integer|String>>} query
 * @param {Mixed} [value]
 * @returns {Rx.Observable<module:JGL~PathValue>}
 */
/**
 * @typedef PatternJGLModelHandler~Method
 * @type {PatternJGLModelHandler.GET|PatternJGLModelHandler.SET|PatternJGLModelHandler.DEL}
 */
//------------------------------------------------------------------------------
// Constructor
//------------------------------------------------------------------------------
/**
 * @class PatternJGLModelHandler
 * @param {PatternJGLModelHandler~Method} method
 * @param {PatternJGLModelParser~Pattern} pattern
 * @param {PatternJGLModelHandler~Action} action
 */
function PatternJGLModelHandler (method, pattern, action) {
    this.method = method.toLowerCase();
    this.pattern = pattern;
    this.parser = protean.instantiate(Parser, pattern);
    this.run = action;
}
//------------------------------------------------------------------------------
// Static Members
//------------------------------------------------------------------------------
Object.defineProperties(PatternJGLModelHandler,
    /** @lends PatternJGLModelHandler */{
    /**
     * @constant
     */
    GET: { value: 'get', enumerable: true, configurable: false },
    /**
     * @constant
     */
    SET: { value: 'set', enumerable: true, configurable: false },
    /**
     * @constant
     */
    DEL: { value: 'del', enumerable: true, configurable: false }
});
//------------------------------------------------------------------------------
// Instance Members
//------------------------------------------------------------------------------
module.exports = classify(PatternJGLModelHandler,
    /** @lends PatternJGLModelHandler# */{
    /**
     * The method to use: 'get', 'set', or 'del'
     * @property {PatternJGLModelHandler.GET|PatternJGLModelHandler.SET|PatternJGLModelHandler.DEL}
     */
    method: null,
    /**
     * The un-parsed pattern
     * @property {PatternJGLModelHandler~Pattern}
     */
    pattern: null,
    /**
     * The {@link PatternJGLModelParser} instance used for determining if the
     * handler handles a particular query
     * @property {PatternJGLModelParser}
     */
    parser: null,
    /**
     * @method
     * @param {Array<Array<Integer|String>>} query
     * @param {Mixed} [value]
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    run: null,
    /**
     * @param {String} method
     * @param {module:JGL~Query} query
     * @returns {Array<Array<String|Integer>>}
     */
    match: function (method, query) {
        return this.method === method.toLowerCase() &&
            this.parser.match(query);
    }
});

