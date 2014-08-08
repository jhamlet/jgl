/**
 * Compares two concrete paths to each other and returns true if they are the same
 * @member module:JGL.equals
 * @function
 * @param {module:JGL~Path} src
 * @param {module:JGL~Path} other
 * @returns {Boolean}
 */
module.exports = function equals (src, other) {
    var i = src.length,
        flag = i === other.length;

    while (flag && i--) {
        flag = src[i] === other[i];
    }

    return flag;
};
