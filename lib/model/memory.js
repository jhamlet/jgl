var JGLModel = require('./base'),
    JGL = require('../'),
    Rx = require('rx'),
    _ = require('underscore');
/**
 * @class MemoryJGLModel
 * @extends JGLModel
 * @param {Object} [graph={}]
 * @param {Object} [path=[]]
 */
function MemoryJGLModel (graph, path) {
    MemoryJGLModel.superclass.call(this, path);
    this.graph = graph || {};
}

module.exports = JGLModel.extend(MemoryJGLModel,/** @lends MemoryJGLModel# */{
    /**
     * @property {Object}
     * @default {}
     */
    graph: null,
    /**
     */
    destroy: function () {
        MemoryJGLModel.superproto.destroy.call(this);
        _.extend(this, { graph: null });
    },
    /**
     * @private
     * @param {module:JGLModel~Query} query
     * @returns {Rx.Observable<module:JGLModel~PathValue>}
     */
    _get: function (query) {
        var graph = this.graph;

        return Rx.Observable.defer(function () {
            return Rx.Observable.
                fromArray(JGL.get(graph, query));
        });
    },
    /**
     * @private
     * @param {module:JGLModel~PathValue} pv
     * @returns {Rx.Observable<module:JGLModel~PathValue>}
     */
    _set: function (pv) {
        var graph = this.graph;

        return Rx.Observable.
            defer(function () {
                return Rx.Observable.
                    fromArray(JGL.set(graph, pv));
            });
    },
    /**
     * @private
     * @param {module:JGLModel~Query} query
     * @returns {Rx.Observable<module:JGLModel~PathValue>}
     */
    _del: function (path) {
        var graph = this.graph;

        return Rx.Observable.
            defer(function () {
                return Rx.Observable.
                    fromArray(JGL.del(graph, path));
            });
    }
});
