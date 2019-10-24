const setOfOrderedPairs = require('../../src/geometry/orderedPairs');

describe('given input that should be a single Array containing one or more ordered pairs', () => {
    describe('when validating input', () => {
        describe('and improper data is received', () => {
            it('throws error when more than one Array is received', () => {
                const result = () => setOfOrderedPairs([1, 2], [1, 2]);

                expect(result).toThrowError(/input must be a single Array/);
            });

            it('throws error when input is not an Array', () => {
                const result = () => setOfOrderedPairs({ coordinates: [1, 2] });

                expect(result).toThrowError(/input must be type Array/);
            });

            it('throws error when an empty Array is received', () => {
                const result = () => setOfOrderedPairs([]);

                expect(result).toThrowError(/Array must not be empty/);
            });
        });
    });

    describe('when validating an ordered pair', () => {
        it('throws error when more than two coordinates are given', () => {
            const result = () => setOfOrderedPairs([[1, 2, 3]]);

            expect(result).toThrowError(/ordered pairs must contain no more than two coordinates/);
        });

        it('throws error when two values representing X- and Y-coordinates are not given', () => {
            const result = () => setOfOrderedPairs([[, 3]]);

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

            it('return array with valid ordered pairs and no duplicates', () => {
                const result = setOfOrderedPairs(setWithDuplicates);

                expect(result).toEqual(setNoDuplicates);
            });
        });
    });
});