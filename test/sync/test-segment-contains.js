/*globals describe, it */
var should = require('should'),
    JGL = require('../../');

describe('JGL.segmentContains()', function () {
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
            JGL.segmentContains(segment, key).should.equal(true);
        });
    });

    it('should return false if key is not contained by segment', function () {
        [
            'bar',
            -1,
            9
        ].
        forEach(function (key) {
            JGL.segmentContains(segment, key).should.equal(false);
        });
    });

    it('should return true for ranges that overlap', function () {
        JGL.segmentContains(segment, { from: 2, to: 5 }).should.equal(true);
    });

    it('should return false for ranges that do not overlap', function () {
        JGL.segmentContains(segment, { from: 5, to: 9 }).should.equal(false);
    });

    it('should return true for query segments', function () {
        JGL.segmentContains(segment, ['foo', 0]).should.be.true;
        JGL.segmentContains(segment, ['foo', 0, {to: 2}]).should.be.true;
        JGL.segmentContains(segment, [{to: 2}]).should.be.true;
    });
});

