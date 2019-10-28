const { QUADRILATERAL } = require('./constants/polygonTypes');

function makeQuadrilateral(orderedPairSet) {
  return { type: QUADRILATERAL, coordinates: orderedPairSet };
}

module.exports = makeQuadrilateral;
