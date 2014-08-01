/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.explode()', function () {

    it('should explode a query into all possible paths', function () {
        var result = OPL.explode([[1, 2], ['foo', 'bar'], {from: 3, to: 4}]);

        result.should.eql([
            [1, 'foo', 3],
            [2, 'foo', 3],
            [1, 'bar', 3],
            [2, 'bar', 3],
            [1, 'foo', 4],
            [2, 'foo', 4],
            [1, 'bar', 4],
            [2, 'bar', 4]
        ]);
    });

});

