const {
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
        const pairsSetNoDuplicates = [[1, 2], [1, 1], [2, 1]];
        const indexOfPairToCompare = 0;
        const compareCoordinate = compareCoordinateOfSelectPairToOthersInSet(pairsSetWithDuplicates)(indexOfPairToCompare);
        const abscissa = 0;
        const ordinate = 1;
        const doMatchX = compareCoordinate(abscissa);
        const doMatchY = compareCoordinate(ordinate);

        describe('determine if there are duplicates', () => {
            describe('recursively check each coordinate of a pair in a set', () => {
                describe('and check which pairs do match a particular pair in the set', () => {
                    it('returns an array holding the index value of pairs whose abscissas (X-coordinates) do match that of the first ordered pair', () => {
                        const expected = [1, 2, 3, 5];

                        expect(doMatchX).toEqual(expected);
                    });

                    it('returns an array holding the index value of pairs whose ordinates (Y-coordinates) do match that of the first ordered pair', () => {
                        const expected = [2, 4, 5, 6, 7];

                        expect(doMatchY).toEqual(expected);
                    });

                    it('finds the intersection of the two sets of pairs that match the selected pair\'s abscissa and ordinate', () => {
                        const result = intersection(doMatchX)(doMatchY);

                        expect(result).toEqual([2, 5]);
                    });
                });
            });

            describe('create new array with duplicate pair(s) removed', () => {
                it('locate duplicates in set', () => {
                    const result = locateDuplicatesOfPair(pairsSetWithDuplicates)(indexOfPairToCompare);

                    expect(result).toEqual([2, 5]);
                });

                it('create new array with (selected set of) duplicates removed', () => {
                    const result = removeDuplicateOfSelectPair(pairsSetWithDuplicates)(indexOfPairToCompare);

                    expect(result).toEqual([[1, 2], [1, 2], [2, 1], [1, 1], [2, 1], [2, 1]]);
                });
            });

            describe('recursion', () => {
                it('recursively removes duplicates and creates new array free of duplicates', () => {
                    const result = filterUniquePairs(pairsSetWithDuplicates);

                    expect(result).toEqual(pairsSetNoDuplicates);
                });
            });

            it('switches from X to Y or vice versa', () => {
                const result = toggleXOrY(ordinate);
                const expected = abscissa;

                expect(result).toBe(expected);
            });
        });
    });
});