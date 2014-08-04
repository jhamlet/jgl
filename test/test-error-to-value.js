/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.errorToValue()', function () {

    it('should look like an error', function () {
        var error = new Error('Foobar'),
            value = OPL.errorToValue(error);

        value['@error'].should.be.a.object;
        value['@error'].message.should.equal('Foobar');
        value['@error'].name.should.equal('Error');
        value['@error'].should.have.property('stack');
    });

    it('should have the name of the Error constructor', function () {
        OPL.errorToValue(new RangeError())['@error'].
            name.
            should.
            equal('RangeError');
    });
});

