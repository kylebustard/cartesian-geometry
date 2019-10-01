const { makeLine, makeTriangle, areaOfATriangle, distanceBetweenTwoPoints, classifyTriangle, measureSidesOfATriangle } = require('../src/cartesian-geometry');
const triangleTypes = require('../constants/triangleTypes');
const geometricTypes = require('../constants/geometricTypes');

test('makes a line out of two points', () => {
    const result = makeLine([[0, 0], [1, 1]]);
    const expected = { type: geometricTypes.LINE, coordinates: [[0, 0], [1, 1]] };

    expect(result).toEqual(expected);
});

test('two ordered pairs that point to identical coordinates do not make a line', () => {
    const result = makeLine([[1, 1], [1, 1]]);
    const expected = { type: geometricTypes.LINE, coordinates: [[1, 1], [1, 1]] };

    expect(result).not.toBe(expected);
});

test('makes a triangle from three points', () => {
    const result = makeTriangle([[0, 0], [2, 4], [10, 5]]);
    const expected = { type: geometricTypes.TRIANGLE, coordinates: [[0, 0], [2, 4], [10, 5]] }

    expect(result).toEqual(expected);
});

test('a point is collinear if it lies on the same straight line', () => {
    const result = makeTriangle([[0, 0], [1, 1], [2, 2]]);
    const expected = { type: geometricTypes.LINE, coordinates: [[0, 0], [1, 1], [2, 2]] };

    expect(result).toEqual(expected);
});

test('calculates the area of a triangle', () => {
    const result = areaOfATriangle([[0, 0], [2, 4], [10, 5]]);

    expect(result).toBe(15);
})

test('calculates the distance between two points', () => {
    const result = distanceBetweenTwoPoints([[15, 20], [35, 5]]);

    expect(result).toBe(25);
});

test('measures the sides of a triangle', () => {
    const triangle = makeTriangle([[0, 0], [3, 0], [0, 3]]);
    const result = measureSidesOfATriangle(triangle);

    const [pointOne, pointTwo, pointThree] = triangle.coordinates;

    const distOne = distanceBetweenTwoPoints([pointOne, pointTwo])
    const distTwo = distanceBetweenTwoPoints([pointTwo, pointThree])
    const distThree = distanceBetweenTwoPoints([pointThree, pointOne])
    const expected = [distOne, distTwo, distThree];

    expect(result).toEqual(expected);
})

xtest('compare the sides of a triangle', () => {
    const triangle = makeTriangle([[0, 0], [3, 0], [0, 3]]);
    const [sideOne, sideTwo, sideThree] = measureSidesOfATriangle(triangle);
    const result = compareSidesOfATriangle([sideOne, sideTwo, sideThree]);

    expect(result).toBe(expected);
})

xdescribe('Triangle classification', () => {
    test('appends a classification property on the object returned from `makeFunction`', () => {
        const triangle = makeTriangle([[0, 0], [2, 4], [10, 5]]);
        const result = classifyTriangle(triangle);
        const expected = { ...triangle, classification: null };

        expect(result).toEqual(expected);
    });

    test('Equilateral classification', () => {
        const triangle = makeTriangle([[0, 0], [3, 0], [0, 3]]);
        const result = classifyTriangle(triangle);
        const expected = { ...triangle, classification: triangleTypes.EQUILATERAL };

        expect(result.classification).toEqual(triangleTypes.EQUILATERAL);
    });
});
