var explode = require('./explode'),
    _ = require('underscore');
/**
 * @member module:OPL.get
 * @function
 * @param {Object} obj The source object to pull values from
 * @param {...module:OPL~Query} path The object paths to look up
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function get (obj/*, ...paths*/) {
    return _.
        rest(arguments, 1).
        reduce(function (acc, query) {
            return explode(query).
                reduce(function (acc, path) {
                    var ctx = obj,
                        len = path.length,
                        i = 0,
                        error;

                    for (; i < len; i++) {
                        try {
                            ctx = ctx[path[i]];
                        }
                        catch (e) {
                            error = e;
                        }

                        if (error) {
                            ctx = error;
                            ctx.path = path.slice(0, i + 1);
                            break;
                        }
                    }
                    
                    acc.push([path, ctx]);
                }, acc);
        }, []);
};

