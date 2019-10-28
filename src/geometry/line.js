const { LINE } = require('./constants/polygonTypes');

function makeLine(orderedPairSet) {
  return { type: LINE, coordinates: orderedPairSet };
}

module.exports = makeLine;
