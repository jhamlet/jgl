
module.exports = function valueToError (obj) {
    var e = obj['@error'],
        name,
        error;

    if (e) {
        name = e.name;
        error = Object.create((this[name] || Error.prototype));
        error.name = name;
        error.message = e.message;
        error.stack = e.stack;
    }

    return error || obj;
};
