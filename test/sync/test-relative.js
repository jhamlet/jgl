/*globals describe, it */
var should = require('should'),
    JGL = require('../../');

describe('JGL.relative()', function () {

    it('should return a relative path', function () {
        var from = ['foo', 'bar'],
            to = ['foo', 'bar', 'abc', 'def'],
            expected = ['abc', 'def'];

        JGL.
            relative(from, to).
            should.
            eql(expected);
    });

    it('should return the full path if not relative', function () {
        var from = ['bar', 'foo'],
            to = ['foo', 'bar', 'abc', 'def'],
            expected = ['foo', 'bar', 'abc', 'def'];

        JGL.
            relative(from, to).
            should.
            eql(expected);
    });

    it('should return relative queries', function () {
        var from = ['foo', 'bar', { to: 9}],
            to = ['foo', 'bar', [1, 2, 3], 'id'];

        JGL.
            relative(from, to).
            should.
            eql(['id']);
    });

    it('should return the full query if not relative', function () {
        var from = ['foo', 'bar', { to: 9}],
            to = ['foo', 'bar', [11, 12, 13], 'id'];

        JGL.
            relative(from, to).
            should.
            eql(['foo', 'bar', [11, 12, 13], 'id']);
    });

    it('should return the full query if fully relative', function () {
        var from = [],
            to = ['foo', 'bar', [11, 12, 13], 'id'];

        JGL.
            relative(from, to).
            should.
            eql(['foo', 'bar', [11, 12, 13], 'id']);
    });
});

