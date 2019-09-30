const { makeLine, makeTriangle, areaOfATriangle, distanceBetweenTwoPoints, classifyTriangle } = require('../src/cartesian-geometry');
const triangleTypes = require('../constants/triangleTypes');
const geometricTypes = require('../constants/geometricTypes');

test('makes a line out of two points', () => {
    const result = makeLine([0, 0], [1, 1]);
    const assertion = { type: geometricTypes.LINE, coordinates: [[0, 0], [1, 1]] };

    expect(result).toEqual(assertion);
});

xtest('two ordered pairs that point to identical coordinates do not make a line', () => {
    const result = makeLine([1, 1], [1, 1]);
    const assertion = { type: geometricTypes.LINE, coordinates: [[1, 1], [1, 1]] };

    expect(result).not.toBe(assertion);
});

xtest('makes a triangle from three points', () => {
    const result = makeTriangle([0, 0], [2, 4], [10, 5]);

    expect(result).toEqual({ type: geometricTypes.TRIANGLE, coordinates: [[0, 0], [2, 4], [10, 5]] });
});

xtest('a point is collinear if it lies on the same straight line', () => {
    const result = makeTriangle([0, 0], [1, 1], [2, 2]);

    expect(result).toEqual({ type: geometricTypes.LINE, coordinates: [[0, 0], [1, 1], [2, 2]] });
});

xtest('calculates the area of a triangle', () => {
    const result = areaOfATriangle([0, 0], [2, 4], [10, 5]);

    expect(result).toBe(15);
})

xtest('calculates the distance between two points', () => {
    const result = distanceBetweenTwoPoints([15, 20], [35, 5]);

    expect(result).toBe(25);
});

xdescribe('Triangle classification', () => {
    xtest('appends a classification property on the object returned from `makeFunction`', () => {
        const triangle = makeTriangle([0, 0], [2, 4], [10, 5]);
        const result = classifyTriangle(triangle);

        const triangleMock = makeTriangle([0, 0], [2, 4], [10, 5]);
        triangleMock["classification"] = null;

        expect(result).toEqual(triangleMock);
    });

    xtest('Equilateral classification', () => {
        const triangle = makeTriangle([0, 0], [3, 0], [0, 3]);
        const result = classifyTriangle(triangle);

        const triangleMock = makeTriangle([0, 0], [3, 0], [0, 3]);
        triangleMock["classification"] = triangleTypes.EQUILATERAL;

        expect(result).toBe(triangleMock);
    });
});
