/*globals describe, it */
var should = require('should'),
    OPL = require('../'),
    _ = require('underscore');

describe('OPL.get()', function () {
    var doc = {
            foo: {
                bar: [
                    {
                        id: 'bob'
                    },
                    {
                        id: 'marry'
                    }
                ]
            },

            bar: {
                foo: [
                    {
                        id: 'joe'
                    },
                    {
                        id: 'jack'
                    }
                ]
            },

            bob: {
                '@ref': ['foo', 'bar', 0]
            },
            marry: {
                '@ref': ['foo', 'bar', 1]
            },
            joe: {
                '@ref': ['bar', 'foo', 0]
            },
            jack: {
                '@ref': ['bar', 'foo', 1]
            }
        };

    it('should return path values for all paths', function () {
        var path = [['foo', 'bar'], ['foo', 'bar'], {to : 1}, 'id'];
        OPL.get(doc, path).
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
        OPL.get.apply(null, [doc].concat(paths)).
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

        _.chain(OPL.get(doc, path)).
            map(function (pv) {
                path.push({ to: pv.value.length - 1 }, 'id');
                return OPL.get(doc, path);
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
        OPL.get(doc, path).
            should.
            eql([
                { path: ['bob'], value: { '@ref': ['foo', 'bar', 0] } },
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                { path: ['marry'], value: { '@ref': ['foo', 'bar', 1] } },
                { path: ['foo', 'bar', 1, 'id'], value: 'marry' },
                { path: ['joe'], value: { '@ref': ['bar', 'foo', 0] } },
                { path: ['bar', 'foo', 0, 'id'], value: 'joe' },
                { path: ['jack'], value: { '@ref': ['bar', 'foo', 1] } },
                { path: ['bar', 'foo', 1, 'id'], value: 'jack' }
            ]);
    });

    it('should return the referenced value if path ends on reference', function () {
        var path = [['bob', 'marry', 'joe', 'jack']];
        OPL.get(doc, path).
            should.
            eql([
                { path: ['bob'], value: { '@ref': ['foo', 'bar', 0] } },
                { path: ['foo', 'bar', 0], value: { id: 'bob' } },
                { path: ['marry'], value: { '@ref': ['foo', 'bar', 1] } },
                { path: ['foo', 'bar', 1], value: { id: 'marry' } },
                { path: ['joe'], value: { '@ref': ['bar', 'foo', 0] } },
                { path: ['bar', 'foo', 0], value: { id: 'joe' } },
                { path: ['jack'], value: { '@ref': ['bar', 'foo', 1] } },
                { path: ['bar', 'foo', 1], value: { id: 'jack' } }
            ]);
    });
});

