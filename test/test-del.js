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

            bob: { '@ref': ['foo', 'bar', 0] },
            marry: { '@ref': ['foo', 'bar', 1] },
            joe: { '@ref': ['bar', 'foo', 0] },
            jack: { '@ref': ['bar', 'foo', 1] }
        };
    });

    it('should follow references', function () {
        var path = ['bob', 'id'];

        OPL.
            del(doc, path).
            should.
            eql([
                { path: ['bob'], value: { '@ref': ['foo', 'bar', 0] } },
                { path: ['bob', 'id'] }
            ]);

        (doc.foo.bar[0].id === undefined).should.equal(true);
        doc.bob.should.eql({ '@ref': ['foo', 'bar', 0] });
    });

    it('should delete references but not the actual value', function () {
        var path = [['bob'], ['marry'], ['joe'], ['jack']];

        OPL.
            del.apply(null, [doc].concat(path)).
            should.
            eql([
                { path: ['bob'] },
                { path: ['marry'] },
                { path: ['joe'] },
                { path: ['jack'] }
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

