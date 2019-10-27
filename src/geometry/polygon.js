const {
  POINT,
  LINE,
  TRIANGLE,
  QUADRILATERAL
} = require('./constants/polygonTypes');
const makeTriangle = require('./triangle');

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

function makeLine(orderedPairSet) {
  return { type: LINE, coordinates: orderedPairSet };
}

function makePoint(orderedPairSet) {
  return { type: POINT, coordinates: orderedPairSet };
}

module.exports = polygon;
