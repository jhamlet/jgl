var JGLModel = require('../base'),
    Handler = require('./handler'),
    Parser = require('./parser'),
    JGL = require('../../'),
    Rx = require('rx'),
    _ = require('underscore');
/**
 * @class PatternJGLModel
 * @extends JGLModel
 * @param {...PatternJGLModelHandler} handler
 */
function PatternJGLModel () {
    PatternJGLModel.superclass.call(this);
    /**
     * @member PatternJGLModel#_handlerMatrix
     * @property {Array<PatternJGLModelHandler>}
     * @private
     */
    this._handlerMatrix = [];

    _.rest(arguments, 0).
        forEach(function (args) {
            this.handle.apply(this, _.isArray(args) ? args : [args]);
        }.bind(this));

}

_.extend(PatternJGLModel, {
    /**
     * @memberof PatternJGLModel
     * @see PatternJGLModelParser
     */
    Parser: Parser,
    /**
     * @memberof PatternJGLModel
     * @see PatternJGLModelHandler
     */
    Handler: Handler
});

module.exports = JGLModel.extend(PatternJGLModel,/** @lends PatternJGLModel# */{
    /**
     * Add a new handler for a JGLModelEndPoint
     * @param {PatternJGLModelHandler|PatternJGLModelHandler~Method} handlerOrMethod
     * @param {PatternJGLModelParser~Pattern} [pattern]
     * @param {PatternJGLModelHandler~Action} [action]
     * @returns {PatternJGLModel} The current instance
     */
    handle: function (handlerOrMethod, pattern, action) {
        var matrix = this._handlerMatrix,
            handler = handlerOrMethod instanceof Handler ?
                handlerOrMethod :
                new Handler(handlerOrMethod, pattern, action),
            list,
            idx;

        idx = handler.pattern.length - 1;
        list = matrix[idx] || (matrix[idx] = []);
        list.push(handler);

        return this;
    },

    destroy: function () {
        PatternJGLModel.superproto.destroy.call(this);
        
        this._handlerMatrix.forEach(function (handlers) {
            if (handlers) {
                handlers.forEach(function (handler) {
                    handler.destroy();
                });
            }
        });

        _.extend(this, {
            _handlerMatrix: null
        });
    },
    /**
     * @private
     * @param {module:JGL~Query} query
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    _get: function (query) {
        return this._handle(Handler.GET, query);
    },
    /**
     * @private
     * @param {module:JGL~PathValue} pv
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    _set: function (pv) {
        return this._handle(Handler.SET, pv.path, pv.value);
    },
    /**
     * @private
     * @param {module:JGL~Query} query
     * @returns {Rx.Observable<module:JGL~PathValue>}
     */
    _del: function (query) {
        return this._handle(Handler.DEL, query);
    },
    /**
     * @private
     */
    _handle: function (type, query, value) {
        var matrix = this._handlerMatrix,
            current = [],
            qLen = query.length,
            isGet = type === Handler.GET,
            handle = this._handle.bind(this, type),
            handlers,
            hLen,
            key,
            h,
            q,
            i,
            match;

        for (q = 0; q < qLen; q++) {
            key = query[q];

            handlers = matrix[q];
            current.push(key);

            if (handlers) {
                for (i = 0, hLen = handlers.length; i < hLen; i++) {
                    h = handlers[i];
                    match = h && h.match(type, current);

                    if (match) {
                        // console.log('QUERY: %j, MATCH: %j', current, match);
                        return h.run(match, value).
                            /*jshint loopfunc: true*/
                            selectMany(function (pv) {
                                var refpath, path;
                                // // console.log('HANDLER-OUTPUT: %j', pv);
                                if (isGet && JGL.pathValueIsRef(pv)) {
                                    refpath = pv.value[JGL.REF_KEY];
                                    path = refpath.concat(query.slice(q + 1));
                                    return Rx.Observable.returnValue(pv).
                                        concat(handle(path));
                                }
                                return Rx.Observable.returnValue(pv);
                            });
                    }
                }
            }
        }

        return Rx.Observable.
            fromArray(JGL.explode(query)).
            select(function (path) { return { path: path }; });
    }
});
