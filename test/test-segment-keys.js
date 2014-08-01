/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.segmentKeys()', function () {

    it('should expand ranges', function () {
        var result = OPL.segmentKeys({from: 0, to: 5});
        result.should.eql([0, 1, 2, 3, 4, 5]);
    });

    it('should leave integers and strings alone', function () {
        OPL.segmentKeys('foo').should.eql(['foo']);
        OPL.segmentKeys(1).should.eql([1]);
    });

    it('should expand nested segments', function () {
        OPL.segmentKeys([1, 'foo', {from: 0, to: 4}]).
            should.eql([1, 'foo', 0, 2, 3, 4]);
    });

});

