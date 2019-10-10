const {
    inputValidation,
    orderedPair,
    setOfOrderedPairs,
    doNotMatchParticularCoordinate,
    numberOfPairsDoNotMatchParticularCoordinate,
    sumOfPairsThatDoNotMatchXOrYOfFirstPair,
    hasDuplicatePairs,
    removeFirstPair,
    recursiveRemove,
    toggleXOrY
} = require('../../src/geometry/polygon.js');

describe('given input that should be a single Array containing one or more ordered pairs', () => {
    describe('when validating input', () => {
        describe('and improper data is received', () => {
            it('throws error when more than one Array is received', () => {
                const result = () => inputValidation([1, 2], [1, 2]);

                expect(result).toThrowError(/input must be a single Array/);
            });

            it('throws error when input is not an Array', () => {
                const result = () => inputValidation({ coordinates: [1, 2] });

                expect(result).toThrowError(/input must be type Array/);
            });

            it('throws error when an empty Array is received', () => {
                const result = () => inputValidation([]);

                expect(result).toThrowError(/Array must not be empty/);
            });
        });
    });

    describe('when validating an ordered pair', () => {
        it('throws error when more than two coordinates are given', () => {
            const result = () => orderedPair([[1, 2, 3]]);

            expect(result).toThrowError(/ordered pairs must contain no more than two coordinates/);
        });

        it('throws error when two values representing X- and Y-coordinates are not given', () => {
            const result = () => orderedPair([[, 3]]);

            expect(result).toThrowError(/ordered pairs must contain two values representing X- and Y-coordinates/);
        });
    });

    describe('when given input that is an Array containing more than one element', () => {
        describe('and validating the Array elements', () => {
            it('throws error when an Array element is not valid input', () => {
                const result = () => setOfOrderedPairs([[1, 2], {}, []]);

                expect(result).toThrowError();
            });

            it('throws error when an Array element is not a valid ordered pair', () => {
                const result = () => setOfOrderedPairs([[1, 1], [1, 2], [, 1]]);    // third element in Array is `[ <1 empty item>, 1 ]`

                expect(result).toThrowError(/ordered pairs must contain two values representing X- and Y-coordinates/);
            });
        });
    });
});

describe('given a set of ordered pairs that may contain duplicate pairs', () => {   // duplicate pairs point to identical coordinates
    describe('then create a new array from the unique ordered pairs if there are duplicates', () => {
        const pairsSetWithDuplicates = [[1, 1], [1, 2], [1, 1], [1, 2], [2, 1], [1, 1], [2, 1], [2, 1]];
        const lengthOfSetWithDupes = pairsSetWithDuplicates.length;
        const pairsSetNoDuplicates = [[1, 1], [1, 2], [2, 1]];
        const abscissa = 0;
        const ordinate = 1;
        const numOfPairsDoNotMatchFirstX = numberOfPairsDoNotMatchParticularCoordinate(pairsSetWithDuplicates)(abscissa);
        const numOfPairsDoNotMatchFirstY = numberOfPairsDoNotMatchParticularCoordinate(pairsSetWithDuplicates)(ordinate);

        const sumOfDiffPairs = sumOfPairsThatDoNotMatchXOrYOfFirstPair(numOfPairsDoNotMatchFirstX)(numOfPairsDoNotMatchFirstY);

        describe('determine if there are duplicates', () => {
            describe('recursively check each coordinate in a pair and check if other pairs have a duplicate matching that same coordinate', () => {
                it('returns an array holding the index value of pairs whose abscissas (X-coordinates) do not match that of the first ordered pair', () => {
                    const result = doNotMatchParticularCoordinate(pairsSetWithDuplicates)(abscissa);
                    const expected = [4, 6, 7];

                    expect(result).toEqual(expected);
                });

                it('returns an array holding the index value of pairs whose ordinates (Y-coordinates) do not match that of the first ordered pair', () => {
                    const result = doNotMatchParticularCoordinate(pairsSetWithDuplicates)(ordinate);
                    const expected = [1, 3];

                    expect(result).toEqual(expected);
                });

                it('determines the number of pairs unique of the first pair\'s abscissa', () => {

                    expect(numOfPairsDoNotMatchFirstX).toBe(3);
                });

                it('determines the number of pairs unique of the first pair\'s ordinate', () => {

                    expect(numOfPairsDoNotMatchFirstY).toBe(2);
                });

                it('sums the length of the number of pairs unique of both the first pair\'s abscissa and ordinate', () => {

                    expect(sumOfDiffPairs).toBe(5);
                });

                it('determines there is at least one duplicate pair if `lengthOfSet - uniqueOrderedPairs` is less than `lengthOfSet - 1`', () => {
                    const result = hasDuplicatePairs(lengthOfSetWithDupes)(sumOfDiffPairs);

                    expect(result).toBe(true);
                });
            });
        });

        describe('create new array with duplicate pair(s) removed', () => {
            it('removes the first pair if there is at least one duplicate', () => {
                const result = removeFirstPair(pairsSetWithDuplicates);
                const expected = [[1, 2], [1, 1], [1, 2], [2, 1], [1, 1], [2, 1], [2, 1]];

                expect(result).toEqual(expected);
            });
        });

        describe('recursion', () => {
            it('recursively removes the first pair and creates a new array while there are duplicates', () => {
                const result = recursiveRemove(pairsSetWithDuplicates);
                const expected = pairsSetNoDuplicates;

                expect(result).toEqual(expected);
            })
        });

        // describe('given a set of ordered pairs that has')

        it('switches from X to Y or vice versa', () => {
            const result = toggleXOrY(ordinate);
            const expected = abscissa;

            expect(result).toBe(expected);
        });

        xit('runs the algorithm for a coordinate, and then the other if the number of pairs that do not match equals less than the length of the set of ordered pairs', () => {
            const result = toggleXOrY(abscissa);
            const expected = numberOfPairsDoNotMatchParticularCoordinate(pairsSetWithDuplicates)(ordinate);

            expect(result).toEqual(expected);
        });
    });

    xit('returns the set of ordered pairs minus the duplicates', () => {
        const result = setOfOrderedPairs(pairsSetWithDuplicates);

        expect(result).toEqual(pairsSetNoDuplicates);
    });
});