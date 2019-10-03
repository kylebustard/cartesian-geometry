const { isPoint } = require('../../src/geometry/polygon.js');

describe('Point', () => {
    it('returns an object containing `POINT` type and coordinates when given an ordered pair', () => {
        const orderedPair = [[1, 2]];
        const result = isPoint(orderedPair);

        expect(result).toEqual({ type: 'POINT', coordinates: orderedPair });
    })
})