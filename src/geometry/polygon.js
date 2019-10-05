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
        let firstPair = pairs[i]
        let nextPair = pairs[i + 1]

        let [firstPairX, firstPairY] = firstPair;
        let [nextPairX, nextPairY] = nextPair;

        if (firstPairX === nextPairX && firstPairY === nextPairY) {
            let reduced = reduceIdenticalPairs(pairs);

            return reduced;
        } else {
            return { type: null, coordinates: [firstPair, nextPair] };
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