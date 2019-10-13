function inputValidation(array) {
    if (arguments.length !== 1) {
        throw Error('input must be a single Array');
    } else if (!Array.isArray(array)) {
        throw Error('input must be type Array');
    } else if (!array.length) {
        throw Error('Array must not be empty');
    } else {
        return array;
    }
}

function orderedPair(inputArray) {
    const pair = inputArray[0];
    const [xCoordinate, yCoordinate] = pair;

    if (pair.length > 2) {
        throw Error('ordered pairs must contain no more than two coordinates')
    } else if (!xCoordinate || !yCoordinate) {
        throw Error('ordered pairs must contain two values representing X- and Y-coordinates');
    } else {
        return inputArray;
    }
}

function compareCoordinateOfFirstPairInArrayToRest(manyArraysInAnArray) {
    const isDuplicateOfFirst = [];
    const isUniqueFromFirst = [];

    return function (xOrY) {
        const coordinateFromFirstPairInArray = manyArraysInAnArray[0][xOrY];

        for (let i = 1; i < manyArraysInAnArray.length; i++) {
            if (manyArraysInAnArray[i][xOrY] === coordinateFromFirstPairInArray) {
                isDuplicateOfFirst.push(i);
            } else {
                isUniqueFromFirst.push(i);
            }
        }

        return [isDuplicateOfFirst, isUniqueFromFirst];
    }
}

function numOfPairsMatchingAndDiffFromParticularCoordinate(manyArraysInAnArray) {
    return function (xOrY) {
        return compareCoordinateOfFirstPairInArrayToRest(manyArraysInAnArray)(xOrY).map(arr => arr.length);
    }
}

function intersection(matchXOfAPair) {
    const intersectingPairs = [];

    return function (matchYOfAPair) {
        for (let x = 0; x < matchXOfAPair.length; x++) {
            for (let y = 0; y < matchYOfAPair.length; y++) {
                if (matchXOfAPair[y] === matchYOfAPair[x]) {
                    intersectingPairs.push(matchXOfAPair[y]);
                }

            }
        }

        return intersectingPairs;
    }
}

function locateDuplicatesOfPair(manyArraysInAnArray) {
    const [matchesX,] = compareCoordinateOfFirstPairInArrayToRest(manyArraysInAnArray)(0);
    const [matchesY,] = compareCoordinateOfFirstPairInArrayToRest(manyArraysInAnArray)(1);
    return intersection(matchesX)(matchesY);
}

function removeDuplicateOfFirstPair(manyArraysInAnArray) {
    const intersectingPairs = locateDuplicatesOfPair(manyArraysInAnArray);
    const setMinusFirstPairDupes = [];

    for (let pair = 1; pair < manyArraysInAnArray.length; pair++) {
        for (let i = 0; i < intersectingPairs.length - 1; i++) {
            if (pair !== intersectingPairs[i]) {
                setMinusFirstPairDupes.push(manyArraysInAnArray[pair]);
            }
        }
    }

    return setMinusFirstPairDupes;
}

const sum = a => b => a + b;

const toggleXOrY = xOrY => !!xOrY ? 0 : 1; // If `xOrY` is truthy and equals 1 then return 0, or else return 1.

function setOfOrderedPairs(manyArraysInAnArray) {
    for (let i = 0; i < manyArraysInAnArray.length; i++) {
        let array = manyArraysInAnArray[i];
        let validatedArray = inputValidation([array]);
        orderedPair(validatedArray);
    }

    return removeDupPairs(manyArraysInAnArray);
}

module.exports = {
    inputValidation,
    orderedPair,
    setOfOrderedPairs,
    compareCoordinateOfFirstPairInArrayToRest,
    numOfPairsMatchingAndDiffFromParticularCoordinate,
    intersection,
    sum,
    locateDuplicatesOfPair,
    removeDuplicateOfFirstPair,
    toggleXOrY
}