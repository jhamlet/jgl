/*globals describe, it */
var should = require('should'),
    JGL = require('../../');

describe('JGL.equals()', function () {

    it('should return true for two paths that are the same', function () {
        JGL.equals(['foo', 'bob', 0, 'id'], ['foo', 'bob', 0, 'id']).
            should.
            be.
            true;
    });

    it('should return false for two paths that are not the same', function () {
        JGL.equals(['foo', 'bob', 0, 'id'], ['foo', 'bob']).
            should.
            be.
            false;
    });
});
