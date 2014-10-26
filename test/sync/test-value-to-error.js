/*globals describe, it */
var should = require('should'),
    JGL = require('../../');

describe('JGL.valueToError()', function () {

    it('should be an Error', function () {
        var value = {
                '@error': {
                    name: 'Error',
                    message: 'Foobar',
                    stack: 'abc'
                }
            },
            error = JGL.valueToError(value);

        error.should.be.an.Error;
        error.name.should.equal('Error');
        error.message.should.equal('Foobar');
        error.stack.should.equal('abc');
    });

    it('should create the right kind of error', function () {
        var value = {
                '@error': {
                    name: 'RangeError',
                    message: 'Foobar',
                    stack: 'abc'
                }
            },
            error = JGL.valueToError(value);

        error.should.be.an.RangeError;
    });
});

