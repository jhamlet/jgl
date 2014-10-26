/*globals describe, it */
var should = require('should'),
    JGL = require('../../');

describe('JGL.REF_KEY', function () {
    it('should equal \'@ref\'', function () {
        JGL.REF_KEY.should.equal('@ref');
    });
});

describe('JGL.ERROR_KEY', function () {
    it('should equal \'@error\'', function () {
        JGL.ERROR_KEY.should.equal('@error');
    });
});
