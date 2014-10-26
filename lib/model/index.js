var Base = require('./base'),
    _ = require('underscore');
/**
 * @member module:JGL.Model
 * @see module:JGL.Model.Base
 */
_.extend(Base,/** @lends JGL.Model.Base */{
    /**
     * @property {module:JGL.Model.Cached}
     * @see module:JGL.Model.Cached
     */
    Cached: require('./cached'),
    /**
     * @property {module:JGL.Model.Memory}
     * @see module:JGL.Model.Memory
     */
    Memory: require('./memory'),
    /**
     * @property {module:JGL.Model.Pattern}
     * @see module:JGL.Model.Pattern
     */
    Pattern: require('./pattern')
});

module.exports = Base;
