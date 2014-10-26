/*globals describe, it */
var should = require('should'),
    MemoryOPE = require('../').Memory;

describe('testing', function () {
    var doc = {
            videos: {
                0: {
                    summary: {
                        title: 'Star Wars',
                        year: '1977'
                    }
                },
                1: {
                    summary: {
                        title: 'Empire Strikes Back',
                        year: '1979'
                    }
                },
                2: {
                    summary: {
                        title: 'Revenge of the Jedi',
                        year: '1981'
                    }
                }
            },
            list: {
                0: {
                    0: { item: { '@ref': ['videos', 0] } },
                    1: { item: { '@ref': ['videos', 1] } },
                    2: { item: { '@ref': ['videos', 2] } }
                },
                length: 3
            },
            lolomo: {
                xyz: {
                    0: { '@ref': ['list', 0] },
                    length: 1
                }
            }
        },
        ope = new MemoryOPE(doc);

    it('should...', function () {
        ope.get(['lolomo', 'xyz', 0, { to: 2 }, 'item']).
            subscribe(function (pv) {
                console.log('path-value: %j', pv);
            });
    });
});

