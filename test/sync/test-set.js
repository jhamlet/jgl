/*globals describe, it */
var should = require('should'),
    JGL = require('../../');

describe('JGL.set()', function () {

    it('should set values on an object', function () {
        var obj = {},
            pvs = [
                { path: ['foo', 'bar', 0, 'id'], value: 'foo-bar-0' },
                { path: ['foo', 'bar', 1, 'id'], value: 'foo-bar-1' },
                { path: ['foo', 'bar', 'length'], value: 2 },
                { path: ['bob'], value: { '@ref': ['foo', 'bar', 0] } }
            ];

        pvs.
            forEach(function (pv) {
                JGL.set(obj, pv).should.eql([pv]);
            });

        obj.should.eql({
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
            bob: { '@ref': ['foo', 'bar', 0] }
        });
    });

    it('should set values through references', function () {
        var doc = {
                foo: {
                    bar: [
                        {},
                        {}
                    ]
                },
                bob: { '@ref': ['foo', 'bar', 0] },
                marry: { '@ref': ['foo', 'bar', 1] }
            };

        JGL.
            set(doc, 
                { path: ['bob', 'id'], value: 'bob' },
                { path: ['marry', 'id'], value: 'marry' }
            ).
            should.
            eql([
                { path: ['bob'], value: { '@ref': ['foo', 'bar', 0] } },
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' },
                { path: ['marry'], value: { '@ref': ['foo', 'bar', 1] } },
                { path: ['foo', 'bar', 1, 'id'], value: 'marry' }
            ]);

        doc.foo.bar[0].id.should.equal('bob');
        doc.foo.bar[1].id.should.equal('marry');
    });

});

