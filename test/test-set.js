/*globals describe, it */
var should = require('should'),
    OPL = require('../'),
    _ = require('underscore');

describe('OPL.set()', function () {

    it('should set values on an object', function () {
        var obj = {},
            paths = [
                [['foo', 'bar', 0, 'id'], 'foo-bar-0'],
                [['foo', 'bar', 1, 'id'], 'foo-bar-1'],
                [['foo', 'bar', 'length'], 2],
                [['bob'], ['foo', 'bar', 0]]
            ];

        OPL.set(obj, paths).should.eql(paths);

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

});

