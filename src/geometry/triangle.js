const { TRIANGLE, LINE } = require('./constants/polygonTypes');
const {
  ACUTE,
  OBTUSE,
  RIGHT,
  SCALENE,
  ISOSCELES,
  EQUILATERAL
} = require('./constants/triangleTypes');

function areaOfTriangle(orderedPairSet) {
  const [Ax, Ay] = orderedPairSet[0];
  const [Bx, By] = orderedPairSet[1];
  const [Cx, Cy] = orderedPairSet[2];

  return Math.abs((Ax * (By - Cy) + Bx * (Cy - Ay) + Cx * (Ay - By)) / 2);
}

function makeTriangle(orderedPairSet) {
  return areaOfTriangle(orderedPairSet) > 0
    ? { type: TRIANGLE, coordinates: orderedPairSet }
    : { type: LINE, coordinates: orderedPairSet };
}

module.exports = makeTriangle;
