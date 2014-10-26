/*globals describe, it */
var should = require('should'),
    JGL = require('../../');

describe('JGL.explode()', function () {

    it('should explode a query into all possible paths', function () {
        var result = JGL.explode([[1, 2], ['foo', 'bar'], {from: 3, to: 4}]);

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

    it('should explode a range to: 1', function () {
        JGL.explode([{to: 1}]).
            should.
            eql([
                [0],
                [1]
            ]);
    });
});

