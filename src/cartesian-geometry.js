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

function distanceBetweenTwoPoints(arrayOfTwoOrderedPairs) {
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

function makeTriangle(arrayOfThreeOrderedPairs) {
    if (areaOfATriangle(arrayOfThreeOrderedPairs) === 0) {
        return { type: geometricTypes.LINE, coordinates: arrayOfThreeOrderedPairs };
    } else {
        return { type: geometricTypes.TRIANGLE, coordinates: arrayOfThreeOrderedPairs };
    }
}

function measureSidesOfATriangle(triangle) {
    const [sideOne, sideTwo, sideThree] = triangle.coordinates;

    const distOne = distanceBetweenTwoPoints([sideOne, sideTwo]);
    const distTwo = distanceBetweenTwoPoints([sideTwo, sideThree]);
    const distThree = distanceBetweenTwoPoints([sideThree, sideOne]);

    return [distOne, distTwo, distThree];
}

function classifyTriangle(obj) {
    return obj;
}

module.exports = { makeLine, makeTriangle, areaOfATriangle, distanceBetweenTwoPoints, classifyTriangle, wrapArgsInSingleArray, measureSidesOfATriangle };