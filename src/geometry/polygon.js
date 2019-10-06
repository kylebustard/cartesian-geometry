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

function multiplePairs(pairs) {
    let rtnObj = {};
    let newPairs = [];
    let reduced = [];

    for (let i = 0; i < pairs.length - 1; i++) {
        let firstPair = pairs[i];
        let nextPair = pairs[i + 1];

        let [firstPairX, firstPairY] = firstPair;
        let [nextPairX, nextPairY] = nextPair;

        if (i === 0) {
            if (firstPairX === nextPairX && firstPairY === nextPairY) {
                reduced.push(firstPair);
                newPairs.push(nextPair);
            } else {
                newPairs.push(firstPair, nextPair);
                rtnObj.type = null;
            }
        } else {
            if (firstPairX === nextPairX && firstPairY === nextPairY) {
                if (firstPair !== reduced[0]) {
                    reduced.push(firstPair);
                    reduced.push(nextPair);
                    newPairs.push(nextPair);
                } else {
                    // do nothing
                }
            } else {
                if (firstPair === reduced[0] || nextPair === reduced[0]) {
                    if (firstPair === reduced[0]) {
                        reduced.push(firstPair);
                    }

                    if (nextPair === reduced[0]) {
                        reduced.push(nextPair);
                    }
                }
                newPairs.push(firstPair, nextPair);
                rtnObj.type = null;
            }
        }

        if (!rtnObj.type === null) {
            rtnObj.type = 'POINT';
        }
    }

    rtnObj.coordinates = newPairs; console.log('[ XXX ] ', rtnObj);

    return rtnObj;
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