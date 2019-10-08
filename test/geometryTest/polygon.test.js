const {
    inputValidation,
    orderedPair,
    setOfOrderedPairs,
    doNotMatchParticularCoordinate
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
                const result = () => setOfOrderedPairs([[1, 1], [1, 2], [, 1]]); // third element in Array is `[ <1 empty item>, 1 ]`

                expect(result).toThrowError(/ordered pairs must contain two values representing X- and Y-coordinates/);
            });
        });

        describe('and removing duplicate ordered pairs', () => {                // duplicates pointing to identical coordinates
            const pairsSetWithDuplicates = [[1, 1], [1, 2], [1, 1], [1, 2], [2, 1], [1, 1], [2, 1], [2, 1]];
            const pairsSetNoDuplicates = [[1, 1], [1, 2], [2, 1]];

            describe('when implementing an algorithm to create a new array with unique ordered pairs', () => {
                it('returns an array holding the index value of pairs whose abscissas (X-coordinates) do not match that of the first ordered pair', () => {
                    const abscissa = 0;
                    const result = doNotMatchParticularCoordinate(pairsSetWithDuplicates)(abscissa);
                    const expected = [4, 6, 7];

                    expect(result).toEqual(expected);
                });

                it('returns an array holding the index value of pairs whose ordinates (Y-coordinates) do not match that of the first ordered pair', () => {
                    const ordinate = 1;
                    const result = doNotMatchParticularCoordinate(pairsSetWithDuplicates)(ordinate);
                    const expected = [1, 3];

                    expect(result).toEqual(expected);
                });
            });

            xit('returns the set of ordered pairs minus the duplicates', () => {
                const result = setOfOrderedPairs(pairsSetWithDuplicates);

                expect(result).toEqual(pairsSetNoDuplicates);
            });
        });
    });
});
