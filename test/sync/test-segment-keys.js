/*globals describe, it */
var should = require('should'),
    JGL = require('../../');

describe('JGL.segmentKeys()', function () {

    it('should expand ranges', function () {
        var result = JGL.segmentKeys({from: 0, to: 5});
        result.should.eql([0, 1, 2, 3, 4, 5]);
    });

    it('should leave integers and strings alone', function () {
        JGL.segmentKeys('foo').should.eql(['foo']);
        JGL.segmentKeys(1).should.eql([1]);
    });

    it('should expand nested segments', function () {
        JGL.segmentKeys([1, 'foo', {from: 0, to: 4}]).
            should.eql([1, 'foo', 0, 2, 3, 4]);
    });

});

