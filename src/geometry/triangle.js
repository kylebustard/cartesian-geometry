const distanceBetweenTwoPoints = require('./pythagoreanTheorem');
const { TRIANGLE, LINE } = require('./constants/polygonTypes');
const {
  ACUTE,
  OBTUSE,
  RIGHT,
  SCALENE,
  ISOSCELES,
  EQUILATERAL
} = require('./constants/triangleTypes');

function classifyTriangle(orderedPairSet) {
  const [pointA, pointB, pointC] = orderedPairSet;

  const side1Dist = distanceBetweenTwoPoints(pointA)(pointB);
  const side2Dist = distanceBetweenTwoPoints(pointB)(pointC);
  const side3Dist = distanceBetweenTwoPoints(pointC)(pointA);

  const arr = [side1Dist, side2Dist, side3Dist];

  const arr2 = [...new Set(arr)];
  console.log('arr - ', arr);
  console.log('arr2 - ', arr2);

  switch (arr2.length) {
    case 1:
      return EQUILATERAL;
    case 2:
      return ISOSCELES;
    default:
      return null;
  }
}

function areaOfTriangle(orderedPairSet) {
  const [Ax, Ay] = orderedPairSet[0];
  const [Bx, By] = orderedPairSet[1];
  const [Cx, Cy] = orderedPairSet[2];

  const areaOfTriangleUsingCoordinates = Math.abs(
    (Ax * (By - Cy) + Bx * (Cy - Ay) + Cx * (Ay - By)) / 2
  );

  return areaOfTriangleUsingCoordinates;
}

function makeTriangle(orderedPairSet) {
  return areaOfTriangle(orderedPairSet) > 0
    ? {
        type: TRIANGLE,
        coordinates: orderedPairSet,
        classification: classifyTriangle(orderedPairSet)
      }
    : { type: LINE, coordinates: orderedPairSet };
}

module.exports = makeTriangle;
