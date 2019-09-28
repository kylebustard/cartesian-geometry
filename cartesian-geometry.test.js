const squares = require('./cartesian-geometry');

test('makes a line out of two points', () => {
    const lineCoordinates = [[0, 0], [1, 1]];

    expect(squares(lineCoordinates)).toEqual({ type: 'LINE' });
})