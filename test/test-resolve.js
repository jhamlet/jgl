/*globals describe, it */
var should = require('should'),
    OPL = require('../');

describe('OPL.resolve()', function () {
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

    it('A', function () {
        OPL.
            resolve(doc, ['people', {to: 1}]).
            should.
            eql([
                { path: ['people', 0], value: doc.people[0] },
                { path: ['bob'], value: doc.bob },
                { path: ['people', 0], value: { id: 'bob', '@path': ['foo', 'bar', 0] } },
                { path: ['people', 1], value: doc.people[1] },
                { path: ['marry'], value: doc.marry },
                { path: ['people', 1], value: { id: 'marry', '@path': ['foo', 'bar', 1] } }
            ]);
    });

    it('B', function () {
        OPL.
            resolve(doc, ['people', {to: 1}, 'id']).
            should.
            eql([
                { path: ['people', 0], value: doc.people[0] },
                { path: ['bob'], value: doc.bob },
                { path: ['people', 0, 'id'], value: 'bob' },
                { path: ['people', 1], value: doc.people[1] },
                { path: ['marry'], value: doc.marry },
                { path: ['people', 1, 'id'], value: 'marry' }
            ]);
    });

    it('C', function () {
        OPL.
            resolve(doc, ['people', 2, 'id']).
            should.
            eql([
                { path: ['people', 2], value: doc.people[2] },
                { path: ['sue'], value: undefined },
            ]);
    });

});

