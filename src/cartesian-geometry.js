const triangleTypes = require('../constants/triangleTypes');

function makeLine(A, B) {
    const coordinates = [];
    for (let prop in arguments) {
        coordinates.push(arguments[prop]);
    }

    if (A == B) {
        return { type: 'ONE_POINT', coordinates: coordinates };
    } else {
        return { type: 'LINE', coordinates: coordinates };
    }
}

function distanceBetweenTwoPoints(A, B) {
    const dx = A[0] - B[0];
    const dy = A[1] - B[1];
    const sumOfDiffs = (dx * dx) + (dy * dy);

    return Math.sqrt(sumOfDiffs);
}

function areaOfATriangle(A, B, C) {
    const result = ((A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1])) / 2);

    return Math.abs(result);
}

function makeTriangle(A, B, C) {
    wrapArgsInSingleArray(A, B)

    if (areaOfATriangle(A, B, C) === 0) {
        return { type: 'LINE', coordinates: coordinates };
    } else {
        return { type: 'TRIANGLE', coordinates: coordinates };
    }
}

function classifyTriangle(obj) {
    obj["classification"] = null;
    return obj;
}

function wrapArgsInSingleArray(...args) {
    let argsInSingleArray = [];
    for (let i = 0; i < args.length; i++) {
        argsInSingleArray.push(args[i]);
    }
    return argsInSingleArray;
}

module.exports = { makeLine, makeTriangle, areaOfATriangle, distanceBetweenTwoPoints, classifyTriangle, wrapArgsInSingleArray };