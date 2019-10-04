const { isValidInput, isPoint } = require('../../src/geometry/polygon.js');

describe('Input validation', () => {
    describe('handling improper data', () => {
        it('throws error when input is not an array', () => {
            const result = () => isValidInput({ coordinates: [1, 2] });

            expect(result).toThrowError(/input must be an Array/);
        });

        it('throws error when more than one input is received', () => {
            const result = () => isValidInput([1, 2], [1, 2]);

            expect(result).toThrowError(/input must be a single Array/);
        })

        it('throws error when input Array.length does not equal 2', () => {
            const result = () => isValidInput([]);

            expect(result).toThrowError(/input must contain two values/);
        })
    });

    describe('ordered pair validation and preparation', () => {
        it('throws error when input is not an array', () => {
            const result = () => isPoint({ coordinates: [1, 2] });

            expect(result).toThrowError(/input must be an Array/);
        })

        it('returns an object containing `POINT` type and coordinates when given a single ordered pair', () => {
            const orderedPair = [[1, 2]];
            const result = isPoint(orderedPair);

            expect(result).toEqual({ type: 'POINT', coordinates: orderedPair });
        });

        describe('when given multiple ordered pairs', () => {
            it('reduces identical ordered pairs to a single ordered pair', () => {
                const result = isPoint([[1, 1], [1, 1]]);

                expect(result.coordinates).toEqual([[1, 1]]);
            });

            it('assigns type `null` to a set of different ordered pairs', () => {
                const result = isPoint([[1, 1], [1, 2]]);

                expect(result).toEqual({ type: null, coordinates: [[1, 1], [1, 2]] });
            });

            it('sorts through a large array, reduces identical pairs, assigns type `null` if one or more different pairs are found', () => {
                const setOfOrderedPairs = [[1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [2, 1]];
                const result = isPoint(setOfOrderedPairs);

                expect(result).toEqual({ type: null, coordinates: setOfOrderedPairs });
            });
        });
    });
});