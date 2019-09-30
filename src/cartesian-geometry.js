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
    const [A, B, C] = arrayOfThreeOrderedPairs;
    const result = ((A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1])) / 2);

    return Math.abs(result);
}

function makeTriangle(arrayOfThreeOrderedPairs) {
    if (areaOfATriangle(arrayOfThreeOrderedPairs) === 0) {
        return { type: geometricTypes.LINE, coordinates: arrayOfThreeOrderedPairs };
    } else {
        return { type: geometricTypes.TRIANGLE, coordinates: arrayOfThreeOrderedPairs };
    }
}

function classifyTriangle(obj) {
    obj["classification"] = null;
    return obj;
}

module.exports = { makeLine, makeTriangle, areaOfATriangle, distanceBetweenTwoPoints, classifyTriangle, wrapArgsInSingleArray };