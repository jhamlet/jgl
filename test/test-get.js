/*globals describe, it */
var should = require('should'),
    OPL = require('../'),
    _ = require('underscore');

describe('OPL.get()', function () {
    var doc = {
            foo: {
                bar: [
                    { id: 'bob' },
                    { id: 'marry' }
                ]
            },

            bob: { '@ref': ['foo', 'bar', 0] },
            marry: { '@ref': ['foo', 'bar', 1] },

            people: [
                { '@ref': ['bob'] },
                { '@ref': ['marry'] },
                { '@ref': ['sue'] }
            ]
        };

    it('should return path values for all paths', function () {
        var path = ['foo', 'bar', {to : 1}, 'id'];
        OPL.get(doc, path).
            should.
            eql([
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                { path: ['foo', 'bar', 1, 'id'], value: 'marry' }
            ]);
    });

    it('should return undefined for undefined values', function () {
        OPL.get(doc, ['foo', 'foo']).
            should.
            eql([
                { path: ['foo', 'foo'], value: undefined }
            ]);
    });

    it('should return no errors for exact-match paths', function () {
        var paths = [
                ['foo', 'bar', 'length'],
                ['foo', 'bar', 0, 'id'],
                ['foo', 'bar', 1, 'id']
            ];

        OPL.get.apply(null, [doc].concat(paths)).
            should.
            eql([
                { path: paths[0], value: 2 },
                { path: paths[1], value: 'bob' },
                { path: paths[2], value: 'marry' }
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
        var path = [['bob', 'marry'], 'id'];
        OPL.get(doc, path).
            should.
            eql([
                { path: ['bob'], value: { '@ref': ['foo', 'bar', 0] } },
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                { path: ['marry'], value: { '@ref': ['foo', 'bar', 1] } },
                { path: ['foo', 'bar', 1, 'id'], value: 'marry' }
            ]);
    });

    it('should return the referenced value if path ends on reference', function () {
        var path = [['bob', 'marry']];
        OPL.get(doc, path).
            should.
            eql([
                { path: ['bob'], value: { '@ref': ['foo', 'bar', 0] } },
                { path: ['foo', 'bar', 0], value: { id: 'bob' } },
                { path: ['marry'], value: { '@ref': ['foo', 'bar', 1] } },
                { path: ['foo', 'bar', 1], value: { id: 'marry' } }
            ]);
    });

    it('should follow multiple references', function () {
        OPL.
            get(doc, ['people', {to: 1}, 'id']).
            should.
            eql([
                { path: ['people', 0], value: { '@ref': ['bob'] } },
                { path: ['bob'], value: { '@ref': ['foo', 'bar', 0] } },
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                { path: ['people', 1], value: { '@ref': ['marry'] } },
                { path: ['marry'], value: { '@ref': ['foo', 'bar', 1] } },
                { path: ['foo', 'bar', 1, 'id'], value: 'marry' }
            ]);
    });

});

