const { isPoint, makeLine, makeTriangle, areaOfATriangle, distBetweenTwoPoints, classifyTriangle, measureSidesOfAPolygon, compareSidesOfATriangle, allSidesAreEqual } = require('../../src/geometry/polygon');
const triangleTypes = require('../../constants/triangleTypes');
const geometricTypes = require('../../constants/geometricTypes');
const sideComparisonTypes = require('../../constants/sideComparisonTypes');

test('makes a line out of two points', () => {
    const result = makeLine([[0, 0], [1, 1]]);
    const expected = { type: geometricTypes.LINE, coordinates: [[0, 0], [1, 1]] };

    expect(result).toEqual(expected);
});

describe('one or more ordered pairs will be evaluated', () => {
    test('three ordered pairs that point to an identical coordinate make one point (and not a line or polygon)', () => {
        const result = isPoint([[1, 1], [1, 1], [1, 1]]);
        const expected = { type: geometricTypes.POINT, coordinates: [[1, 1]] };

        expect(result).toEqual(expected);
    });

    test('`n` ordered pairs that point to `n-1` point(s) return type `null`, and their common ordered pairs are reduced', () => {
        const result = isPoint([[1, 1], [1, 1], [1, 2]]);
        const expected = { type: null, coordinates: [[1, 1], [1, 2]] };

        expect(result).toEqual(expected);
    })
})


// test('two ordered pairs that point to identical coordinates do not make a line', () => {
//     const result = makeLine([[1, 1], [1, 1]]);
//     const expected = { type: geometricTypes.LINE, coordinates: [[1, 1], [1, 1]] };

//     expect(result).not.toBe(expected);
// });

test('calculates the distance between two points', () => {
    const result = distBetweenTwoPoints([[15, 20], [35, 5]]);

    expect(result).toBe(25);
});

describe('Triangle', () => {
    const triangle = makeTriangle([[0, 0], [2, 4], [10, 5]])

    test('makes a triangle from three points', () => {
        const result = triangle;
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


})

describe('Polygon', () => {
    const triangle = makeTriangle([[0, 0], [3, 0], [0, 3]]);

    test('measures the sides', () => {
        const result = measureSidesOfAPolygon(triangle);

        const expected = () => {
            const [pointOne, pointTwo, pointThree] = triangle.coordinates;
            const distOneToTwo = distBetweenTwoPoints([pointOne, pointTwo])
            const distTwoToThree = distBetweenTwoPoints([pointTwo, pointThree])
            const distThreeToOne = distBetweenTwoPoints([pointThree, pointOne])

            return [distOneToTwo, distTwoToThree, distThreeToOne];
        }

        expect(result).toEqual(expected());
    });

    test('All sides are equal', () => {
        const equilateralTriangle = makeTriangle([[0, 0], [6, 0], [3, 6]]);
        const result = allSidesAreEqual(equilateralTriangle);

        expect(result).toBe(true);
    })
})

describe('Triangle classification', () => {
    xdescribe('compare the sides of a right triangle', () => {
        const triangle = makeTriangle([[0, 0], [3, 0], [0, 3]]); // Right triangle    
        const [sideOne, sideTwo, sideThree] = measureSidesOfAPolygon(triangle);

        test('two sides of equal length are EQUAL', () => {


            const result = compareSidesOfATriangle([sideOne, sideTwo, sideThree]);
            const expected = [];

            expect(result).toBe(expected);
        })
    })

    xtest('appends a classification property on the object returned from `makeFunction`', () => {
        const triangle = makeTriangle([[0, 0], [2, 4], [10, 5]]);
        const result = classifyTriangle(triangle);
        const expected = { ...triangle, classification: null };

        expect(result).toEqual(expected);
    });

    xtest('Equilateral classification', () => {
        const triangle = makeTriangle([[0, 0], [3, 0], [0, 3]]);
        const result = classifyTriangle(triangle);
        const expected = { ...triangle, classification: triangleTypes.EQUILATERAL };

        expect(result.classification).toEqual(triangleTypes.EQUILATERAL);
    });
});
