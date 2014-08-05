/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.REF_KEY', function () {
    it('should equal \'@ref\'', function () {
        OPL.REF_KEY.should.equal('@ref');
    });
});

describe('OPL.ERROR_KEY', function () {
    it('should equal \'@error\'', function () {
        OPL.ERROR_KEY.should.equal('@error');
    });
});
