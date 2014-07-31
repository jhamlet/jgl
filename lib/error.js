/**
 * @class module:OPL~Error
 * @extends Error
 * @param {module:OPL~Path} path
 * @param {String} message
 */
function OplError (path, message) {
    Error.call(this, message);
    this.path = path;
    this.message = message;
}

OplError.prototype = Object.create(Error.prototype);

OplError.prototype.toString = function () {
    return 'Error: OplError: ' + JSON.stringify(this.path);
};

module.exports = OplError;

