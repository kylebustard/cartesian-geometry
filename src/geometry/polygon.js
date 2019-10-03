function isPoint(orderedPair) {
    return { type: 'POINT', coordinates: orderedPair };
}

module.exports = { isPoint }