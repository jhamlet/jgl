/**
 * @member module:OPL.isRange
 * @function
 * @param {Object} obj
 * @returns {Boolean}
 */
module.exports = function isRange (obj) {
    if (obj !== null && typeof obj === 'object') {
        return !(isNaN(obj.to));
    }
    return false;
};

