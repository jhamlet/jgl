var _ = require('underscore');
/**
 * @namespace jgl.model
 */
_.extend(exports,/** @lends jgl.model */{
    /**
     * @see JGLEvaluator
     */
    Base: require('./base'),
    /**
     * @see MemoryJGLEvaluator
     */
    Memory: require('./memory'),
    /**
     * @see PatternJGLEvaluator
     */
    Pattern: require('./pattern'),
    /**
     * @see CachedJGLEvaluator
     */
    Cached: require('./cached')
});

