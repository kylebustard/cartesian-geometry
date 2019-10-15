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

function setOfOrderedPairs(nestedArrays) {
    const length = nestedArrays.length;
    let array, validatedArray;

    for (let i = 0; i < length; i++) {
        array = nestedArrays[i];
        validatedArray = inputValidation([array]);
        orderedPair(validatedArray);
    }

    return noDupes(nestedArrays);
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

function indexOfNextUniquePair(nestedArrays) {
    const length = nestedArrays.length;
    const occurences = findAllOccurencesOfPair(nestedArrays);

    return indexOfPair => {
        const firstPairOccurences = occurences(indexOfPair);

        for (let i = indexOfPair + 1; i < length; i++) {

            return firstPairOccurences.includes(i) ? indexOfNextUniquePair(nestedArrays.slice(i)) : i;
        }
    }
}

const lastValueInArray = nestedArrays => nestedArrays.map(subArray => subArray[subArray.length - 1]).flat();

function noDupes(nestedArrays) {
    const length = nestedArrays.length;
    const arr = [];
    const findAllOccurences = findAllOccurencesOfPair(nestedArrays);

    for (let i = 0; i < length; i++) {
        if (!arr.flat().includes(i)) {
            arr.push(findAllOccurences(i));
        }
    }
    return lastValueInArray(arr).sort().map(i => nestedArrays[i]);
}

module.exports = {
    inputValidation,
    orderedPair,
    pairsAreEqual,
    findAllOccurencesOfPair,
    indexOfNextUniquePair,
    lastValueInArray,
    noDupes,
    setOfOrderedPairs
}