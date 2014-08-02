/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.relative()', function () {

    it('should return a relative path', function () {
        var from = ['foo', 'bar'],
            to = ['foo', 'bar', 'abc', 'def'],
            expected = ['abc', 'def'];

        OPL.
            relative(from, to).
            should.
            eql(expected);
    });

    it('should return the full path if not relative', function () {
        var from = ['bar', 'foo'],
            to = ['foo', 'bar', 'abc', 'def'],
            expected = ['foo', 'bar', 'abc', 'def'];

        OPL.
            relative(from, to).
            should.
            eql(expected);
    });
});

