/*globals describe, it, beforeEach */
var should = require('should'),
    OPL = require('../'),
    _ = require('underscore');

describe('OPL.del()', function () {
    var doc;

    beforeEach(function () {
        doc = {
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
    });

    function mapPathValue (pv) {
        var path = pv[0],
            value = pv[1];

        if (value instanceof Error) {
            // value = value.message;
            value = 'ERROR';
        }

        return { path: path, value: value };
    }

    it('should follow references', function () {
        var path = ['bob', 'id'],
            val;

        OPL.
            del(doc, path).
            map(mapPathValue).
            should.
            eql([
                { path: ['foo', 'bar', 0, 'id'], value: 'bob' }
            ]);

        (doc.foo.bar[0].id === undefined).should.equal(true);
        doc.bob.should.eql(['foo', 'bar', 0]);
    });

    it('should delete references but not the actual value', function () {
        var path = [['bob', 'marry', 'joe', 'jack']];

        OPL.
            del(doc, path).
            map(mapPathValue).
            should.
            eql([
                { path: ['bob'], value: ['foo', 'bar', 0] },
                { path: ['marry'], value: ['foo', 'bar', 1] },
                { path: ['joe'], value: ['bar', 'foo', 0] },
                { path: ['jack'], value: ['bar', 'foo', 1] }
            ]);

        doc.
            should.
            eql({
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
                }
            });
    });
});

