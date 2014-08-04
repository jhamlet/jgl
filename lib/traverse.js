var REF_KEY = '@ref',
    UNDEFINED;
/**
 * @member module:OPL~traverse
 * @function
 * @private
 * @param {Object} graph The object to traverse
 * @param {module:OPL~Path} path The path to follow
 * @param {Boolean} [populate=false] Whether or not to create objects along the path
 * on the object if they are not already defined
 * @returns {Array<module:OPL~PathValue>}
 */
module.exports = function traverse (graph, path, populate) {
    var ctx     = graph,
        len     = path.length,
        lastIdx = len - 1,
        i       = 0,
        current = [],
        key,
        ref;

    for (; i < len; i++) {
        key = path[i];

        if (key !== UNDEFINED && key !== null) {
            if (ctx === UNDEFINED) { break; }

            current.push(key);

            try {
                // reset nulls to undefined so we get interesting errors
                ctx = ctx === null ? UNDEFINED : ctx;
                // Update our context object base on whether we are populating, and
                // based on what our current key is
                ctx = ctx[key] === UNDEFINED && populate ?
                    (ctx[key] = {}) :
                    ctx[key];
                // If the current context has a @ref property and we have not
                // finished following the path, continue traversing from the
                // reference point in the document
                if (ctx !== UNDEFINED && ctx[REF_KEY] && i < lastIdx) {
                    ref = ctx[REF_KEY].concat(path.slice(i + 1));
                    return [{ path: current, value: ctx }].
                        concat(traverse(graph, ref, populate));
                }
            }
            catch (error) {
                return [{ path: current, value: error }];
            }
        }
    }

    return [{ path: current, value: ctx }];
};
