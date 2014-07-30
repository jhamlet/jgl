/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.get()', function () {
    var doc = {
            foo: {
                bar: {
                    0: {
                        id: 'foo-bar-0'
                    },
                    1: {
                        id: 'foo-bar-1'
                    },
                    length: 2
                }
            },

            bar: {
                foo: {
                    0: {
                        id: 'bar-foo-0'
                    },
                    1: {
                        id: 'bar-foo-1'
                    },
                    length: 2
                }
            }
        };

    function mapPathValue (pv) {
        var path = pv[0],
            value = pv[1];

        if (value instanceof Error) {
            value = 'ERROR';
        }

        return { path: path, value: value };
    }

    it('should return path values for all paths', function () {
        OPL.get(doc, [['foo', 'bar'], ['foo', 'bar'], {to : 1}, 'id']).
            map(mapPathValue).
            // slice(0, 8).
            should.
            eql([
                { path: ['foo', 'foo', 0], value: 'ERROR' },
                { path: ['bar', 'foo', 0, 'id'], value: 'bar-foo-0' },
                { path: ['foo', 'bar', 0, 'id'], value: 'foo-bar-0' },
                { path: ['bar', 'bar', 0], value: 'ERROR' },
                { path: ['foo', 'foo', 1], value: 'ERROR' },
                { path: ['bar', 'foo', 1, 'id'], value: 'bar-foo-1' },
                { path: ['foo', 'bar', 1, 'id'], value: 'foo-bar-1' },
                { path: ['bar', 'bar', 1], value: 'ERROR' }
            ]);
    });

    it('should return undefined for undefined values', function () {
        OPL.get(doc, ['foo', 'foo'], ['bar', 'bar']).
            map(mapPathValue).
            should.
            eql([
                { path: ['foo', 'foo'], value: undefined },
                { path: ['bar', 'bar'], value: undefined }
            ]);
    });

    it('should return no errors for exact-match paths', function () {
        var paths = [
                ['foo', 'bar', 'length'],
                ['foo', 'bar', 0, 'id'],
                ['foo', 'bar', 1, 'id'],
                ['bar', 'foo', 'length'],
                ['bar', 'foo', 0, 'id'],
                ['bar', 'foo', 1, 'id']
            ];

        OPL.get.apply(null, [doc].concat(paths)).
            map(mapPathValue).
            should.
            eql([
                { path: paths[0], value: 2 },
                { path: paths[1], value: 'foo-bar-0' },
                { path: paths[2], value: 'foo-bar-1' },
                { path: paths[3], value: 2 },
                { path: paths[4], value: 'bar-foo-0' },
                { path: paths[5], value: 'bar-foo-1' }
            ]);
    });

    it('should compose well', function () {
        OPL.get(doc, ['foo', 'bar', 'length']).
            forEach(function (pv) {
                OPL.get(doc, ['foo', 'bar', { to: pv[1] - 1 }, 'id']).
                    map(mapPathValue).
                    should.
                    eql([
                        { path: ['foo', 'bar', 0, 'id'], value: 'foo-bar-0' },
                        { path: ['foo', 'bar', 1, 'id'], value: 'foo-bar-1' }
                    ]);
            });
    });

});

