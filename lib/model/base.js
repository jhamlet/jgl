var classify = require('protean').classify,
    JGL = require('../'),
    Rx = require('rx'),
    _ = require('underscore');
/**
 * @class module:JGL.Model.Base
 * @param {module:JGL~Query} [path=[]] Optional path to pre-bind to.
 */
function JGLModel (path) {
    this.path = path || [];
    this._root = this;
}

module.exports = classify(JGLModel,/** @lends module:JGL.Model.Base# */{
    /**
     * @property {module:JGL~Query}
     */
    path: null,
    /**
     * @param {module:JGL~Query} path The path to bind to
     * @returns {BoundJGLModel} An JGLModel bound to the given path
     */
    bind: function (path) {
        var copy = Object.create(this);
        copy.path = this.path.concat(path);
        copy._ancestor = this;
        return copy;
    },
    /**
     * @param {Rx.Observable<module:JGL~Query>} [obs] An observable of paths
     * @param {...module:JGL~Query} [path] One or more paths to retrieve
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    get: function () {
        var roots       = this.path,
            queries     = _.rest(arguments, 0),
            get         = this._get.bind(this),
            handleError = this._handleError.bind(this),
            graph       = {};

        return Rx.Observable.
            fromArray(JGL.explode(roots)).
            selectMany(function (root) {
                return Rx.Observable.
                    fromArray(queries).
                    selectMany(function (query) {
                        var resp = { path: query, value: {} },
                            path, ref;

                        return get(root.concat(query)).
                            select(handleError).
                            reduce(function (acc, pv) {
                                var fullpath, relpath;

                                // console.log('pv: %j', pv);
                                JGL.set(graph, pv);

                                if (JGL.pathValueIsRef(pv)) {
                                    path = path ? path : pv.path;
                                    ref = pv.value[JGL.REF_KEY];
                                }
                                else {
                                    fullpath = path ?
                                        path.concat(pv.path.slice((ref || []).length)) :
                                        pv.path;

                                    relpath = JGL.relative(root, fullpath);

                                    path = null;
                                    ref = null;

                                    // console.log('fullpath: %j', fullpath);
                                    // console.log('relpath: %j', relpath);

                                    JGL.set(acc.value, {
                                        path: relpath,
                                        value: JGL.get(graph, pv.path).pop().value
                                    });
                                }

                                return acc;
                            }, resp);
                    });
            });
    },
    /**
     * @param {...module:JGL~PathValue} [pv] One or more path-values to set
     * @param {Rx.Observable<module:JGL~PathValue>} [obs] An observable of path values
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    set: function () {
        var root = this.path,
            set = this._set.bind(this);

        return Rx.Observable.
            fromArray(_.rest(arguments, 0)).
            selectMany(function (pv) {
                return Rx.Observable.
                    fromArray(JGL.explode(root)).
                    select(function (path) {
                        return {
                            path: path.concat(pv.path),
                            value: pv.value
                        };
                    }).
                    selectMany(set);
            });
    },
    /**
     * @param {Rx.Observable<module:JGL~Query>} [obs] An observable of paths
     * @param {...module:JGL~Query} [path] One or more paths to delete
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    del: function () {
        var root = this.path,
            del = this._del.bind(this);

        return Rx.Observable.
            fromArray(_.rest(arguments, 0)).
            selectMany(function (query) {
                return Rx.Observable.
                    fromArray(JGL.explode(root)).
                    select(function (r) { return r.concat(query); }).
                    selectMany(del);
            });
    },
    /**
     */
    destroy: function () {
        _.extend(this, {
            path: null,
            _root: null,
            _ancestor: null
        });
    },
    /**
     * @property {JGLModel}
     * @private
     */
    _root: null,
    /**
     * @property {JGLModel}
     * @private
     */
    _ancestor: null,
    /**
     * @private
     * @param {module:JGL~PathValue} pv
     * @returns {module:JGL~PathValue} pv
     */
    _handleError: function (pv) {
        if (JGL.pathValueIsError(pv)) {
            pv.value = JGL.valueToError(pv.value);
        }
        return pv;
    },
    /**
     * @private
     * @param {JGL.PathValue}
     * @returns {Boolean}
     */
    _isDefinedAndNotError: function (pv) {
        return pv.value !== undefined && !JGL.pathValueIsError(pv);
    },
    /**
     * @method
     * @abstract
     * @private
     * @param {module:JGL~Query} query
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    _get: null,
    /**
     * @method
     * @abstract
     * @private
     * @param {module:JGL~PathValue} pv
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    _set: null,
    /**
     * @method
     * @abstract
     * @private
     * @param {module:JGL~Query} query
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    _del: null
});
