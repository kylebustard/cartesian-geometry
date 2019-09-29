const { makeLine } = require('./cartesian-geometry');

test('makes a line out of two points', () => {
    const lineCoordinates = [[0, 0], [1, 1]];

    expect(makeLine(lineCoordinates)).toEqual({ type: 'LINE' });
})