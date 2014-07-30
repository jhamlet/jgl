var _ = require('underscore'),
    classify = require('protean').classify;
/**
 * @class OPL
 * @param {Array<OPL~Segment>} path
 */ 
function OPL (path) {
    /**
     * @member OPL#path
     * @type {Array<OPL~Segment>}
     */
    this.path = path || [];
}

_.extend(OPL, {
    keysForSegement: require('./segment-keys'),
    explode: require('./explode'),
    // collapse: require('./collapse')
    // get: require('./get'),
    // put: require('./put'),
    // call: require('./call'),
});

module.exports = classify(OPL,
    /** @lends OPL# */{
    get: function (obj) {
    },
    put: function (obj, value) {
    },
    call: function (obj, args) {
    }
});

