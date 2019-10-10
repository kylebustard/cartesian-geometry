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

function orderedPair(oneArrayInAnArray) {
    const array = oneArrayInAnArray[0];
    const [xCoordinate, yCoordinate] = array;

    if (array.length > 2) {
        throw Error('ordered pairs must contain no more than two coordinates')
    } else if (!xCoordinate || !yCoordinate) {
        throw Error('ordered pairs must contain two values representing X- and Y-coordinates');
    } else {
        return oneArrayInAnArray;
    }
}

function doNotMatchParticularCoordinate(manyArraysInAnArray) {
    const isUniqueFromFirstPair = [];

    return function (xOrY) {
        const coordinateFromFirstPairInArray = manyArraysInAnArray[0][xOrY];

        for (let i = 1; i < manyArraysInAnArray.length; i++) {
            if (manyArraysInAnArray[i][xOrY] !== coordinateFromFirstPairInArray) {
                isUniqueFromFirstPair.push(i);
            }
        }

        return isUniqueFromFirstPair;
    }
}

function numberOfPairsDoNotMatchParticularCoordinate(manyArraysInAnArray) {
    return function (xOrY) {
        return doNotMatchParticularCoordinate(manyArraysInAnArray)(xOrY).length;
    }
}

const sumOfPairsThatDoNotMatchXOrYOfFirstPair = numPairsDiffFirstX => numPairsDiffFirstY => numPairsDiffFirstX + numPairsDiffFirstY; // 

function setMinusPairsThatDoNotMatchXOrYOfFirstPair(manyArraysInAnArray) {
    return function (pairsThatDoNotMatchXOrYOfFirstPair) {
        return manyArraysInAnArray.length - pairsThatDoNotMatchXOrYOfFirstPair;
    }
}

const hasDuplicatePairs = lengthSetWithDupes => sumOfUniques => lengthSetWithDupes - sumOfUniques !== 0 ? true : false;

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
    doNotMatchParticularCoordinate,
    numberOfPairsDoNotMatchParticularCoordinate,
    sumOfPairsThatDoNotMatchXOrYOfFirstPair,
    setMinusPairsThatDoNotMatchXOrYOfFirstPair,
    hasDuplicatePairs,
    toggleXOrY
}