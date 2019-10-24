const { POINT, LINE, TRIANGLE, QUADRILATERAL } = require('./constants');

function polygon(orderedPairSet) {
  switch (orderedPairSet.length) {
    case 1:
      return makePoint(orderedPairSet);
    case 2:
      return makeLine(orderedPairSet);
    case 3:
      return makeTriangle(orderedPairSet);
    case 4:
      return makeQuadrilateral(orderedPairSet);
  }
}

function makeQuadrilateral(orderedPairSet) {
  return { type: QUADRILATERAL, coordinates: orderedPairSet };
}

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

function makeLine(orderedPairSet) {
  return { type: LINE, coordinates: orderedPairSet };
}

function makePoint(orderedPairSet) {
  return { type: POINT, coordinates: orderedPairSet };
}

module.exports = polygon;
