const { makeLine, makeTriangle, areaOfATriangle, distanceBetweenTwoPoints, classifyTriangle, wrapArgsInSingleArray } = require('../src/cartesian-geometry');
const triangleTypes = require('../constants/triangleTypes');

test('makes a line out of two points', () => {

    expect(makeLine([0, 0], [1, 1])).toEqual({ type: 'LINE' });
});

test('two ordered pairs that point to identical coordinates do not make a line', () => {

    expect(makeLine([1, 1], [1, 1])).not.toBe({ type: 'LINE' });
});

test('makes a triangle from three points', () => {
    const result = makeTriangle([0, 0], [2, 4], [10, 5]);

    expect(result).toEqual({ type: 'TRIANGLE' });
});

test('a point is collinear if it lies on the same straight line', () => {
    const result = makeTriangle([0, 0], [1, 1], [2, 2]);

    expect(result).toEqual({ type: 'LINE' });
});

test('calculates the area of a triangle', () => {
    const result = areaOfATriangle([0, 0], [2, 4], [10, 5]);

    expect(result).toBe(15);
})

test('calculates the distance between two points', () => {
    const result = distanceBetweenTwoPoints([15, 20], [35, 5]);

    expect(result).toBe(25);
});

xdescribe('Triangle classification', () => {
    test('appends a classification property on the object returned from `makeFunction`', () => {
        const triangle = makeTriangle([0, 0], [2, 4], [10, 5]);
        const result = classifyTriangle(triangle);

        const triangleMock = makeTriangle([0, 0], [2, 4], [10, 5]);
        triangleMock["classification"] = null;

        expect(result).toEqual(triangleMock);
    });

    test('Equilateral classification', () => {
        const triangle = makeTriangle([0, 0], [3, 0], [0, 3]);
        const result = classifyTriangle(triangle);

        const triangleMock = makeTriangle([0, 0], [3, 0], [0, 3]);
        triangleMock["classification"] = triangleTypes.EQUILATERAL;

        expect(result).toBe(triangleMock);
    });
});