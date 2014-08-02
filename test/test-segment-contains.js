/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.segmentContains()', function () {
    var segment = [0, 'foo', {from: 1, to: 4}];

    it('should return true if key is contained by segment', function () {
        [
            0,
            'foo',
            1,
            2,
            3,
            4
        ].
        forEach(function (key) {
            OPL.segmentContains(segment, key).should.equal(true);
        });
    });

    it('should return false if key is not contained by segment', function () {
        [
            'bar',
            -1,
            9
        ].
        forEach(function (key) {
            OPL.segmentContains(segment, key).should.equal(false);
        });
    });

    it('should return true for ranges that overlap', function () {
        OPL.segmentContains(segment, { from: 2, to: 5 }).should.equal(true);
    });

    it('should return false for ranges that do not overlap', function () {
        OPL.segmentContains(segment, { from: 5, to: 9 }).should.equal(false);
    });
});

