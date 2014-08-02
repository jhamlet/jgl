/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.rangeContains()', function () {

    it('should return true if index falls within range', function () {
        OPL.rangeContains({ from: 0, to: 4 }, 3).should.equal(true);
    });

    it('should return false if index falls outside of range', function () {
        OPL.rangeContains({ from: 0, to: 4}, 9).should.equal(false);
    });

    it('should return false for non-integer indexes', function () {
        [
            'foo',
            5.4,
            null,
            undefined
        ].
            forEach(function (arg) {
                OPL.rangeContains({ from: 0, to: 4 }, arg).
                    should.equal(false);
            });
    });

});

