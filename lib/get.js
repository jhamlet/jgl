var explode = require('./explode'),
    OplError = require('./error'),
    _ = require('underscore');
/**
 * @member module:OPL.get
 * @function
 * @param {Object} obj The source object to pull values from
 * @param {Array<module:OPL~Query>} paths The object paths to look up
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function get (obj, paths) {
    return paths.
        reduce(function (acc, query) {
            return explode(query).
                reduce(function (acc, path) {
                    var ctx = obj,
                        len = path.length,
                        i = 0;

                    for (; i < len; i++) {
                        try {
                            ctx = ctx[path[i]];
                        }
                        catch (e) {
                            ctx = new OplError(path.slice(0, i), e.message);
                            acc.push([ctx.path, ctx]);
                            break;
                        }
                    }
                    
                    acc.push([path, ctx]);
                    return acc;
                }, acc);
        }, []);
};

