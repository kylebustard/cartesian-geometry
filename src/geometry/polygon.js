function isValidInput(input) {
    if (!Array.isArray(input)) {
        throw Error('input must be an Array');
    } else if (arguments.length !== 1) {
        throw Error('input must be a single Array');
    } else if (input.length !== 2) {
        throw Error('input must contain two values');
    } else {
        return input;
    }
}

function reduceIdenticalPairs(pairs) {
    return { type: 'POINT', coordinates: [pairs[0]] };
}

function multiplePairs(pairs) {
    for (let i = 0; i < pairs.length; i++) {
        if (pairs[i][0] === pairs[i + 1][0] && pairs[i][1] === pairs[i + 1][1]) {
            return reduceIdenticalPairs(pairs);
        } else {
            return { type: null, coordinates: [pairs[0], pairs[1]] };
        }
    }
}

function isPoint(orderedPair) {
    if (!Array.isArray(orderedPair)) {
        throw Error('input must be an Array');
    }

    if (orderedPair.length > 1) {
        return multiplePairs(orderedPair);
    }

    return { type: 'POINT', coordinates: orderedPair }
}

module.exports = { isValidInput, isPoint }