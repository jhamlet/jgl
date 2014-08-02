/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.isRange()', function () {

    it('should return true if object has a valid \'to\' property', function () {
        OPL.isRange({ to: 4 }).should.equal(true);
    });

    it('should return false if object does not have a valid \'to\' property', function () {
        OPL.isRange({}).should.equal(false);
    });
});

