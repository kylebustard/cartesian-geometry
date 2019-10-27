const makeTriangle = require('../../src/geometry/triangle');
const {
  ACUTE,
  OBTUSE,
  RIGHT,
  SCALENE,
  ISOSCELES,
  EQUILATERAL
} = require('../../src/geometry/constants/triangleTypes');

describe('given a triangle that needs to be classified', () => {
  describe('when all sides and angles are equal', () => {
    it('is an equilateral', () => {
      const result = makeTriangle([[0, 0], [2, 2], [4, 0]]);

      expect(result).toMatchObject({ classification: EQUILATERAL });
    });
  });
});
