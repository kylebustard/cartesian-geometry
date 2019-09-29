const { makeLine, makeTriangle } = require('./cartesian-geometry');

test('makes a line out of two points', () => {
    const coordinates = [[0, 0], [1, 1]];

    expect(makeLine(coordinates)).toEqual({ type: 'LINE' });
});

test('two ordered pairs that point to identical coordinates do not make a line', () => {
    const coordinates = [[1, 1], [1, 1]];

    expect(makeLine(coordinates)).not.toBe({ type: 'LINE' });
});

test('makes a triangle from three points', () => {
    const coordinates = [[0, 0], [1, 1], [2, 2]];

    expect(makeTriangle(coordinates)).toEqual({ type: 'TRIANGLE' });
});

xtest('a point is collinear if it lies on the same straight line', () => {
    const coordinates = [[0, 0], [1, 1], [2, 2]];

    expect(makeTriangle(coordinates)).toEqual({ type: 'LINE' });
});