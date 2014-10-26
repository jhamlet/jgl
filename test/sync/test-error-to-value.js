/*globals describe, it */
var should = require('should'),
    JGL = require('../../');

describe('JGL.errorToValue()', function () {

    it('should look like an error', function () {
        var error = new Error('Foobar'),
            value = JGL.errorToValue(error);

        value['@error'].should.be.a.object;
        value['@error'].message.should.equal('Foobar');
        value['@error'].name.should.equal('Error');
        value['@error'].should.have.property('stack');
    });

    it('should have the name of the Error constructor', function () {
        JGL.errorToValue(new RangeError())['@error'].
            name.
            should.
            equal('RangeError');
    });
});

