var JGLModel = require('./base'),
    JGL = require('../'),
    Rx = require('rx'),
    _ = require('underscore');
/**
 * @class module:JGL.Model.Cached
 * @extends module:JGL.Model.Base
 * @param {Object} opts
 * @param {JGLModel} opts.cache
 * @param {JGLModel} opts.proxy
 */
function CachedJGLModel (opts) {
    CachedJGLModel.superclass.call(this);
    this._cache = opts.cache;
    this._proxy = opts.proxy;
}

module.exports = JGLModel.extend(CachedJGLModel,/** @lends module:JGL.Model.Cached# */{
    bind: function (path) {
        var copy = CachedJGLModel.superproto.bind.call(this, path);
        copy._cache = this._cache.bind(path);
        copy._proxy = this._proxy.bind(path);
        return copy;
    },
    /**
     * @param {Rx.Observable<module:JGL~PathValue>} [obs] An observable of
     * path values to set
     * @param {...module:JGL~PathValue} [pv] or, one or more path values
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    setCache: function () {
        var cache = this._cache;
        return cache.set.apply(cache, arguments);
    },
    /**
     * @param {Rx.Observable<module:JGL~Query>} [obs] An observable of
     * queries to delete
     * @param {...module:JGL~Query} [query] or, one or more queries
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    delCache: function () {
        var cache = this._cache;
        return cache.del.apply(cache, arguments);
    },
    /**
     */
    destroy: function () {
        CachedJGLModel.superproto.destroy.call(this);

        this._cache.destroy();
        this._proxy.destroy();

        _.extend(this, {
            _cache: null,
            _proxy: null
        });
    },
    /**
     * @property {JGLModel}
     * @private
     */
    _cache: null,
    /**
     * @property {JGLModel}
     * @private
     */
    _proxy: null,
    /**
     * @private
     * @param {module:JGL~Query} query
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    _get: function (query) {
        var cache = this._cache,
            proxy = this._proxy,
            defAndNotError = this._isDefinedAndNotError;

        // console.log('CACHE QUERY: %j', query);

        return Rx.Observable.create(function (observer) {
            var expected = JGL.explode(query).
                    reduce(function (acc, path) {
                        acc[JSON.stringify(path)] = true;
                        return acc;
                    }, {}),
                disposed = false,
                expectedPaths,
                cacheSubscription,
                proxySubscription;

            function done (error) {
                if (!disposed) {
                    cacheSubscription && cacheSubscription.dispose();
                    proxySubscription && proxySubscription.dispose();
                    expected = null;
                    expectedPaths = null;
                    observer[error ? 'onError' : 'onCompleted'](error);
                }
            }
            // first we see what paths we can solve with the cache
            cacheSubscription =
                cache.
                _get(query).
                subscribe(
                    function (pv) {
                        var key = JSON.stringify(pv.path);
                        // If we get something back, flag it as being received
                        if (expected[key] &&
                            pv.value !== undefined &&
                            !JGL.pathValueIsError(pv)
                        ) {
                            expected[key] = false;
                            observer.onNext(pv);
                        }
                    },
                    done,
                    function () {
                        // console.log('---GOING TO PROXY---');
                        function next (pv) {
                            if (!disposed) {
                                // console.log('CACHE NEXT: %j', pv);
                                observer.onNext(pv);
                            }
                        }
                        // now that we have completed getting from the cache, time to
                        // fetch from the proxy if there are any outstanding expected
                        // paths
                        expectedPaths =
                            _.keys(expected).
                            reduce(function (acc, key) {
                                if (expected[key]) {
                                    acc.push(JSON.parse(key));
                                }
                                return acc;
                            }, []);
                        // TODO: When we can collapse paths back to a query use that
                        // instead of getting all paths
                        proxySubscription =
                            Rx.Observable.
                            fromArray(expectedPaths).
                            selectMany(function (path) {
                                // console.log('PROXY-GET: %j', path);
                                return proxy.
                                    _get(path).
                                    where(defAndNotError).
                                    // set them on the cache
                                    selectMany(cache._set.bind(cache));
                            }).
                            subscribe(next, done, done);
                    }
                );

            return Rx.Disposable.create(done);
        });
    },
    /**
     * @private
     * @param {module:JGL~PathValue} pv
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    _set: function (pv) {
        var cache = this._cache,
            proxy = this._proxy;

        return proxy.
            _set(pv).
            where(this._isDefinedAndNotError).
            selectMany(cache._set.bind(cache));
    },
    /**
     * @private
     * @param {module:JGL~Query} query
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    _del: function (query) {
        var cache = this._cache,
            proxy = this._proxy;

        return proxy.
            _del(query).
            where(this._isDefinedAndNotError).
            selectMany(cache._del.bind(cache));
    }
});
