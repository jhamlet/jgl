/*globals describe, it */
var should = require('should'),
    JGL = require('../../');

describe('JGL.isRange()', function () {

    it('should return true if object has a valid \'to\' property', function () {
        JGL.isRange({ to: 4 }).should.equal(true);
    });

    it('should return false if object does not have a valid \'to\' property', function () {
        JGL.isRange({}).should.equal(false);
    });
});

