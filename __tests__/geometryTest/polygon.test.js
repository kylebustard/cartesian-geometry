const {
    inputValidation,
    orderedPair,
    pairsAreEqual,
    findAllOccurencesOfPair,
    indexOfNextUniquePair,
    lastValueInArray,
    setOfOrderedPairs
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

    describe('Given input that is an Array containing more than one element', () => {
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

    describe('given a set of ordered pairs that may contain duplicates of one or more ordered pairs', () => {   // duplicate pairs point to identical coordinates
        describe('then create a new array containing only unique ordered pairs', () => {
            const setWithDuplicates = [[1, 1], [1, 2], [1, 1], [1, 2], [2, 1], [1, 1], [2, 1], [2, 1]];
            const setNoDuplicates = [[1, 2], [1, 1], [2, 1]];
            const indexOfSelectPair = 0;
            const allOccurrencesOfPair = [0, 2, 5];

            it('returns true if the asbcissa & ordinate of one pair equal those of another', () => {
                const result = pairsAreEqual([1, 1])([1, 1]);

                expect(result).toBe(true);
            });

            it('finds all occurences of an ordered pair', () => {
                const result = findAllOccurencesOfPair(setWithDuplicates)(indexOfSelectPair);

                expect(result).toEqual(allOccurrencesOfPair);
            });

            it('selects next pair that is not an occurence of the previous', () => {
                const result = indexOfNextUniquePair(setWithDuplicates)(0);

                expect(result).toBe(1);
            });

            it('returns the last value in each array in a new array that is flat', () => {
                const result = lastValueInArray([[0, 2, 5], [1, 3], [4, 6, 7]]);

                expect(result).toEqual([5, 3, 7]);
            });

            it('return array with valid ordered pairs and no duplicates', () => {
                const result = setOfOrderedPairs(setWithDuplicates);

                expect(result).toEqual(setNoDuplicates);
            });
        });
    });
});