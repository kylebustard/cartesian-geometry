const { POINT } = require('./constants/polygonTypes');
const makeLine = require('./line');
const makeTriangle = require('./triangle');
const makeQuadrilateral = require('./quadrilateral');

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

function makePoint(orderedPairSet) {
  return { type: POINT, coordinates: orderedPairSet };
}

module.exports = polygon;
