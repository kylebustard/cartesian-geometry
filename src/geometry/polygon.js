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

function reducePair(array) {
    return array.reduce((acc, curr) => {
        return acc + curr
    }, 0);
}

function compareReducedCurrentToNext(current) {
    return function (next) {
        if (current !== next) {
            return [current, next];
        } else {
            return [next];
        }
    }
}

function removeDupPairs(manyArraysInAnArray) {
    let tmpArr = [];
    for (let i = 0; i < manyArraysInAnArray.length - 1; i++) {
        let current = manyArraysInAnArray[i];
        let next = manyArraysInAnArray[i + 1];

        console.log(`${i}, current: ${current}`)
        console.log(`${i + 1}, next: ${next}`)
        tmpArr.push(compareReducedCurrentToNext(reducePair(current))(reducePair(next)));

    }

    return tmpArr;
}

function setOfOrderedPairs(manyArraysInAnArray) {
    for (let i = 0; i < manyArraysInAnArray.length; i++) {
        let array = manyArraysInAnArray[i];
        let validatedArray = inputValidation([array]);
        orderedPair(validatedArray);
    }

    return removeDupPairs(manyArraysInAnArray);
}

module.exports = { inputValidation, orderedPair, setOfOrderedPairs }