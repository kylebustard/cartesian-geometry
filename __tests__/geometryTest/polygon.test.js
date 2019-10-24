const polygon = require('../../src/geometry/polygon');
const {
  POINT,
  LINE,
  TRIANGLE,
  QUADRILATERAL
} = require('../../src/geometry/constants');

describe('given a set of one or more ordered pairs', () => {
  describe('one', () => {
    it('makes a point', () => {
      const result = polygon([[1, 1]]);

      expect(result).toMatchObject({ type: POINT });
    });
  });

  describe('two', () => {
    it('make a line', () => {
      const result = polygon([[1, 1], [1, 2]]);

      expect(result).toMatchObject({ type: LINE });
    });
  });

  describe('three', () => {
    describe('collinear points', () => {
      it('make a line', () => {
        const result = polygon([[0, 0], [1, 1], [2, 2]]);

        expect(result).toMatchObject({ type: LINE });
      });
    });

    it('make a triangle', () => {
      const result = polygon([[1, 1], [1, 2], [3, 3]]);

      expect(result).toMatchObject({ type: TRIANGLE });
    });
  });

  describe('four', () => {
    it('make a quadilateral', () => {
      const result = polygon([[1, 1], [1, 2], [3, 3], [3, 4]]);

      expect(result).toMatchObject({ type: QUADRILATERAL });
    });
  });
});
