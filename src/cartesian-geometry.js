const geometricTypes = require('../constants/geometricTypes');
const wrapArgsInSingleArray = require('./utility');

function makeLine(arrayOfTwoOrderedPairs) {
    const [A, B] = arrayOfTwoOrderedPairs;

    if (A === B) {
        return { type: geometricTypes.POINT, coordinates: arrayOfTwoOrderedPairs };
    } else {
        return { type: geometricTypes.LINE, coordinates: arrayOfTwoOrderedPairs };
    }
}

function distBetweenTwoPoints(arrayOfTwoOrderedPairs) {
    const [A, B] = arrayOfTwoOrderedPairs;
    const dx = A[0] - B[0];
    const dy = A[1] - B[1];
    const sumOfDiffs = (dx * dx) + (dy * dy);

    return Math.sqrt(sumOfDiffs);
}

function areaOfATriangle(arrayOfThreeOrderedPairs) {
    const [[Ax, Ay], [Bx, By], [Cx, Cy]] = arrayOfThreeOrderedPairs;
    const result = ((Ax * (By - Cy) + Bx * (Cy - Ay) + Cx * (Ay - By)) / 2);

    return Math.abs(result);
}

function isCollinear(arrayOfThreeOrderedPairs) {
    return areaOfATriangle(arrayOfThreeOrderedPairs) === 0;
}

function makeTriangle(arrayOfThreeOrderedPairs) {
    if (isCollinear(arrayOfThreeOrderedPairs)) {
        return { type: geometricTypes.LINE, coordinates: arrayOfThreeOrderedPairs };
    } else {
        return { type: geometricTypes.TRIANGLE, coordinates: arrayOfThreeOrderedPairs };
    }
}

function measureSidesOfAPolygon(polygon) {
    const arr = polygon.coordinates
    const result = arr.map((orderedPair, index) => index !== arr.length - 1 ? // is not last element in array
        distBetweenTwoPoints([orderedPair, arr[index + 1]]) :                 // pass element and next element in array as arguments
        distBetweenTwoPoints([orderedPair, arr[0]]));                         // or pass last element with first element

    return result;
}

function compareSidesOfATriangle(measuredSidesOfATriangle) {

}

function classifyTriangle(obj) {
    return obj;
}

module.exports = { makeLine, makeTriangle, areaOfATriangle, distBetweenTwoPoints, classifyTriangle, wrapArgsInSingleArray, measureSidesOfAPolygon, compareSidesOfATriangle };