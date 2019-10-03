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

function compareCoordinateOfSelectPairToOthersInSet(manyArraysInAnArray) {

    return function (indexOfPairToCompare) {
        const selectedPair = manyArraysInAnArray[indexOfPairToCompare];
        const slicedArray = manyArraysInAnArray.slice(indexOfPairToCompare);

        return function (xOrY) {
            const coordinateFromSelectedPairInArray = selectedPair[xOrY];
            const pairAndItsDuplicates = [];

            for (let i = 0; i < slicedArray.length; i++) {
                if (slicedArray[i][xOrY] === coordinateFromSelectedPairInArray) {
                    pairAndItsDuplicates.push(i + indexOfPairToCompare);
                }
            }

            return pairAndItsDuplicates;
        }
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
    const setOfPairs = compareCoordinateOfSelectPairToOthersInSet(manyArraysInAnArray);

    return function (indexOfPairToCompare) {
        const selectedPair = setOfPairs(indexOfPairToCompare);
        const matchesX = selectedPair(0);
        const matchesY = selectedPair(1);

        return intersection(matchesX)(matchesY);
    }
}

function removeDuplicateOfSelectPair(manyArraysInAnArray) {
    const locateDupes = locateDuplicatesOfPair(manyArraysInAnArray)

    return function (indexOfPairToCompare) {
        const intersectingPairs = locateDupes(indexOfPairToCompare);
        const setMinusSelectPairDupes = [];

        for (let pair = 0; pair < manyArraysInAnArray.length; pair++) {
            for (let i = 0; i < intersectingPairs.length - 1; i++) {
                setMinusSelectPairDupes.push(manyArraysInAnArray[pair]);
            }
        }
        console.log('XXX: ', setMinusSelectPairDupes)
        return setMinusSelectPairDupes;
    }
}

function initDupes(arr) {

}

function filterUniquePairs(manyArraysInAnArray) {
    const locateDupes = locateDuplicatesOfPair(manyArraysInAnArray)
    const dupes = [];
    const lessDupes = [];
    const trashDupes = [];

    for (let i = 0; i < manyArraysInAnArray.length; i++) {
        let potentialDupesArray = locateDupes(i);

        if (dupes.length === 0 && potentialDupesArray.length !== 0) {
            if (potentialDupesArray.length > 1) {
                dupes.push(potentialDupesArray);    // An array nested in an array. Will need to use `.flat()` later.
            }
        } else {
            if (potentialDupesArray.length > 1) {
                dupes.push(potentialDupesArray);
            }
            let flatDupes = dupes.flat();
            let count = 0;

            for (let dupe = 0; dupe < flatDupes.length; dupe++) {
                if (i === flatDupes[dupe]) {
                    count += 1;
                }
            }

            if (count === 0) {
                lessDupes.push(manyArraysInAnArray[i]);
            } else {
                trashDupes.push(manyArraysInAnArray[i]);
            }
        }
    }

    console.log('lessDupes : ', lessDupes, 'Length: ', lessDupes.length)
    console.log('trashDupes : ', trashDupes, 'Length: ', trashDupes.length)
}

const sum = a => b => a + b;

const toggleXOrY = xOrY => !!xOrY ? 0 : 1; // If `xOrY` is truthy and equals 1 then return 0, or else return 1.

function setOfOrderedPairs(manyArraysInAnArray) {
    for (let i = 0; i < manyArraysInAnArray.length; i++) {
        let array = manyArraysInAnArray[i];
        let validatedArray = inputValidation([array]);
        orderedPair(validatedArray);
    }

    return filterUniquePairs(manyArraysInAnArray);
}

module.exports = {
    inputValidation,
    orderedPair,
    setOfOrderedPairs,
    compareCoordinateOfSelectPairToOthersInSet,
    intersection,
    sum,
    locateDuplicatesOfPair,
    removeDuplicateOfSelectPair,
    filterUniquePairs,
    toggleXOrY
}