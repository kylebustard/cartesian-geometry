module.exports = setOfOrderedPairs;

function setOfOrderedPairs(nestedArrays) {
    const validatedInput = inputValidation(nestedArrays);
    validatedInput(arguments.length);

    const len = nestedArrays.length;
    const setToBeValidated = orderedPairValidation(nestedArrays);

    for (let i = 0; i < len; i++) {
        setToBeValidated(i);
    }

    return noDupes(nestedArrays);
}

function inputValidation(array) {
    return function (argsLength) {
        if (argsLength !== 1) {
            throw Error('input must be a single Array');
        } else if (!Array.isArray(array)) {
            throw Error('input must be type Array');
        } else if (!array.length) {
            throw Error('Array must not be empty');
        }
    }
}

function orderedPairValidation(inputArray) {
    return function (index) {
        const pair = inputArray[index];
        const [xCoordinate, yCoordinate] = pair;

        if (pair.length > 2) {
            throw Error('ordered pairs must contain no more than two coordinates')
        } else if (!xCoordinate || !yCoordinate) {
            throw Error('ordered pairs must contain two values representing X- and Y-coordinates');
        }
    }
}

function pairsAreEqual(pairOne) {
    const pairOneX = pairOne[0];
    const pairOneY = pairOne[1];

    return pairTwo => (pairOneX === pairTwo[0] && pairOneY === pairTwo[1]) ? true : false;
}

function findAllOccurencesOfPair(nestedArrays) {
    const arrayLength = nestedArrays.length;

    return indexOfPair => {
        const checkPair = pairsAreEqual(nestedArrays[indexOfPair]);
        const indices = [];

        for (let i = indexOfPair; i < arrayLength; i++) {
            const pair = nestedArrays[i];

            if (checkPair(pair)) {
                indices.push(i);
            }
        }

        return indices;
    }
}

const lastValueInArray = nestedArrays => nestedArrays.map(subArray => subArray[subArray.length - 1]);

function noDupes(nestedArrays) {
    const length = nestedArrays.length;
    const arr = [];
    const findAllOccurences = findAllOccurencesOfPair(nestedArrays);

    for (let i = 0; i < length; i++) {
        if (!arr.flat().includes(i)) {
            arr.push(findAllOccurences(i));
        }
    }
    return lastValueInArray(arr).flat().sort().map(i => nestedArrays[i]);
}