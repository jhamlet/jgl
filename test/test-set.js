/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.set()', function () {

    it('should set values on an object', function () {
        var obj = {},
            pvs = [
                [['foo', 'bar', 0, 'id'], 'foo-bar-0'],
                [['foo', 'bar', 1, 'id'], 'foo-bar-1'],
                [['foo', 'bar', 'length'], 2],
                [['bob'], ['foo', 'bar', 0]]
            ];

        pvs.
            forEach(function (pv) {
                OPL.set(obj, pv).should.eql([pv]);
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
            bob: ['foo', 'bar', 0]
        });
    });

    it('should set values through references', function () {
        var doc = {
                foo: {
                    bar: {
                        0: {},
                        1: {},
                        length: 2
                    }
                },
                bob: ['foo', 'bar', 0],
                marry: ['foo', 'bar', 1]
            };

        OPL.
            set(doc, 
                [['bob', 'id'], 'bob'],
                [['marry', 'id'], 'marry']
            ).
            should.
            eql([
                [['bob'], ['foo', 'bar', 0]],
                [['foo', 'bar', 0, 'id'], 'bob'],
                [['marry'], ['foo', 'bar', 1]],
                [['foo', 'bar', 1, 'id'], 'marry']
            ]);

        doc.foo.bar[0].id.should.equal('bob');
        doc.foo.bar[1].id.should.equal('marry');
    });

});

