/*globals describe, it */
var should = require('should'),
    OPL = require('../'),
    _ = require('underscore');

describe('OPL.get()', function () {
    var doc = {
            foo: {
                bar: {
                    0: {
                        id: 'bob'
                    },
                    1: {
                        id: 'marry'
                    },
                    length: 2
                }
            },

            bar: {
                foo: {
                    0: {
                        id: 'joe'
                    },
                    1: {
                        id: 'jack'
                    },
                    length: 2
                }
            },

            bob: ['foo', 'bar', 0],
            marry: ['foo', 'bar', 1],
            joe: ['bar', 'foo', 0],
            jack: ['bar', 'foo', 1]
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
                { path: ['foo', 'foo'], value: undefined },
                { path: ['bar', 'foo', 0, 'id'], value: 'joe' },
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                { path: ['bar', 'bar'], value: undefined },
                { path: ['foo', 'foo'], value: undefined },
                { path: ['bar', 'foo', 1, 'id'], value: 'jack' },
                { path: ['foo', 'bar', 1, 'id'], value: 'marry' },
                { path: ['bar', 'bar'], value: undefined }
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
                { path: paths[1], value: 'bob' },
                { path: paths[2], value: 'marry' },
                { path: paths[3], value: 2 },
                { path: paths[4], value: 'joe' },
                { path: paths[5], value: 'jack' }
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
                        { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                        { path: ['foo', 'bar', 1, 'id'], value: 'marry' }
                    ]);
            });
    });

    it('should compose really well', function () {
        var doc = {
                foo: {
                    bar: {
                        baz: {
                            0: { id: 'foo-bar-baz-0' },
                            1: { id: 'foo-bar-baz-1' },
                            2: { id: 'foo-bar-baz-2' },
                            3: { id: 'foo-bar-baz-3' }
                        }
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

    it('should handle references', function () {
        var path = [['bob', 'marry', 'joe', 'jack'], 'id'];
        OPL.get(doc, [path]).
            map(mapPathValue).
            should.
            eql([
                { path: ['bob'], value: ['foo', 'bar', 0] },
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                { path: ['marry'], value: ['foo', 'bar', 1] },
                { path: ['foo', 'bar', 1, 'id'], value: 'marry' },
                { path: ['joe'], value: ['bar', 'foo', 0] },
                { path: ['bar', 'foo', 0, 'id'], value: 'joe' },
                { path: ['jack'], value: ['bar', 'foo', 1] },
                { path: ['bar', 'foo', 1, 'id'], value: 'jack' }
            ]);
    });

});

