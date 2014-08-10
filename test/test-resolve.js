/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.resolve()', function () {

    it('should collapse', function () {
        var pathValues = [
                { path: ['groups', 0, 0], value: { '@ref': ['people', 0] } },
                { path: ['people', 0], value: { '@ref': ['bob'] } },
                { path: ['bob'], value: { '@ref': ['foo', 'bar', 0] } },
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                { path: ['groups', 0, 1], value: { '@ref': ['people', 1] } },
                { path: ['people', 1], value: { '@ref': ['marry'] } },
                { path: ['marry'], value: { '@ref': ['foo', 'bar', 1] } },
                { path: ['foo', 'bar', 1, 'id'], value: 'marry' }
            ];
        OPL.
            resolve(pathValues).
            should.
            eql([
                { path: ['groups', 0, 0, 'id'], value: 'bob' },
                { path: ['groups', 0, 1, 'id'], value: 'marry' }
            ]);
    });

    it('should collapse errors too', function () {
        var pathValues = [
                { path: ['groups', 0, 0], value: { '@ref': ['people', 0] } },
                { path: ['people', 0], value: { '@ref': ['bob'] } },
                { path: ['bob'], value: { '@ref': ['foo', 'bar', 0] } },
                { path: ['foo', 'bar', 0, 'id'], value: new Error() },
                { path: ['groups', 0, 1], value: { '@ref': ['people', 1] } },
                { path: ['people', 1], value: { '@ref': ['marry'] } },
                { path: ['marry'], value: { '@ref': ['foo', 'bar', 1] } },
                { path: ['foo', 'bar', 1, 'id'], value: new Error() }
            ],
            result = OPL.resolve(pathValues);

        result[0].path.should.eql(['groups', 0, 0, 'id']);
        result[0].value.should.be.an.Error;

        result[1].path.should.eql(['groups', 0, 1, 'id']);
        result[1].value.should.be.an.Error;
    });

    it('should not collapse non-refs', function () {
        var pathValues = [
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                { path: ['foo', 'bar', 1, 'id'], value: 'marry' }
            ];

        OPL.
            resolve(pathValues).
            should.
            eql([
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                { path: ['foo', 'bar', 1, 'id'], value: 'marry' }
            ]);
    });

});

