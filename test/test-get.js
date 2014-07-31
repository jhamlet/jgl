/*globals describe, it */
var should = require('should'),
    OPL = require('../'),
    _ = require('underscore');

describe('OPL.get()', function () {
    var doc = {
            foo: {
                bar: [
                    {
                        id: 'foo-bar-0'
                    },
                    {
                        id: 'foo-bar-1'
                    }
                ]
            },

            bar: {
                foo: [
                    {
                        id: 'bar-foo-0'
                    },
                    {
                        id: 'bar-foo-1'
                    }
                ]
            }
        };

    function mapPathValue (pv) {
        var path = pv[0],
            value = pv[1];

        if (value instanceof Error) {
            // value = value.message;
            value = 'ERROR';
        }

        return { path: path, value: value };
    }

    it('should return path values for all paths', function () {
        var path = [['foo', 'bar'], ['foo', 'bar'], {to : 1}, 'id'];
        OPL.get(doc, [path]).
            map(mapPathValue).
            // slice(0, 8).
            should.
            eql([
                { path: ['foo', 'foo'], value: 'ERROR' },
                { path: ['foo', 'foo', 0, 'id'], value: 'ERROR' },
                { path: ['bar', 'foo', 0, 'id'], value: 'bar-foo-0' },
                { path: ['foo', 'bar', 0, 'id'], value: 'foo-bar-0' },
                { path: ['bar', 'bar'], value: 'ERROR' },
                { path: ['bar', 'bar', 0, 'id'], value: 'ERROR' },
                { path: ['foo', 'foo'], value: 'ERROR' },
                { path: ['foo', 'foo', 1, 'id'], value: 'ERROR' },
                { path: ['bar', 'foo', 1, 'id'], value: 'bar-foo-1' },
                { path: ['foo', 'bar', 1, 'id'], value: 'foo-bar-1' },
                { path: ['bar', 'bar'], value: 'ERROR' },
                { path: ['bar', 'bar', 1, 'id'], value: 'ERROR' }
            ]);
    });

    it('should return undefined for undefined values', function () {
        var paths = [['foo', 'foo'], ['bar', 'bar']];
        OPL.get(doc, paths).
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

        OPL.get(doc, paths).
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
        var path = ['foo', 'bar', 'length'];
        OPL.get(doc, [path]).
            forEach(function (pv) {
                var path = ['foo', 'bar', { to: pv[1] - 1 }, 'id'];
                OPL.get(doc, [path]).
                    map(mapPathValue).
                    should.
                    eql([
                        { path: ['foo', 'bar', 0, 'id'], value: 'foo-bar-0' },
                        { path: ['foo', 'bar', 1, 'id'], value: 'foo-bar-1' }
                    ]);
            });
    });

    it('should compose really well', function () {
        var doc = {
                foo: {
                    bar: {
                        baz: [
                            { id: 'foo-bar-baz-0' },
                            { id: 'foo-bar-baz-1' },
                            { id: 'foo-bar-baz-2' },
                            { id: 'foo-bar-baz-3' }
                        ]
                    }
                }
            },
            path = ['foo', 'bar', 'baz'];

        _.chain(OPL.get(doc, [path])).
            map(function (pv) {
                path.push(Object.keys(pv[1]), 'id');
                return OPL.get(doc, [path]).
                    map(mapPathValue);
            }).
            flatten().
            value().
                should.
                eql([
                    { path: ['foo', 'bar', 'baz', 0, 'id'], value: 'foo-bar-baz-0' },
                    { path: ['foo', 'bar', 'baz', 1, 'id'], value: 'foo-bar-baz-1' },
                    { path: ['foo', 'bar', 'baz', 2, 'id'], value: 'foo-bar-baz-2' },
                    { path: ['foo', 'bar', 'baz', 3, 'id'], value: 'foo-bar-baz-3' }
                ]);
    });

});

