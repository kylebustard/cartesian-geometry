function makeLine(input) {
    if (input.length === 2) {
        if (input[0] == input[1]) {
            return { type: 'ONE_POINT' };
        } else {
            return { type: 'LINE' };
        }
    }
}

function distanceBetweenTwoPoints(pointA, pointB) {
    const dx = pointA[0] - pointB[0];
    const dy = pointA[1] - pointB[1];
    const sumOfDiffs = (dx * dx) + (dy * dy);

    return Math.sqrt(sumOfDiffs);
}

function areaOfATriangle(input) {
    const [[Ax, Ay], [Bx, By], [Cx, Cy]] = input;
    const result = ((Ax * (By - Cy) + Bx * (Cy - Ay) + Cx * (Ay - By)) / 2)

    return Math.abs(result);
}

function makeTriangle(input) {
    if (input.length === 3) {
        if (areaOfATriangle(input) === 0) {
            return { type: 'LINE' };
        } else {
            return { type: 'TRIANGLE' };
        }
    }
}

module.exports = { makeLine, makeTriangle, areaOfATriangle, distanceBetweenTwoPoints };