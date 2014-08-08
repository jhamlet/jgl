/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.equals()', function () {

    it('should return true for two paths that are the same', function () {
        OPL.equals(['foo', 'bob', 0, 'id'], ['foo', 'bob', 0, 'id']).
            should.
            be.
            true;
    });

    it('should return false for two paths that are not the same', function () {
        OPL.equals(['foo', 'bob', 0, 'id'], ['foo', 'bob']).
            should.
            be.
            false;
    });
});
