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

/*
Right	Features one 90° angle.
X Equilateral	All sides & angles are congruent. (All angles are 60°.)
Isosceles	Two equal sides & two equal angles.
Scalene	No congruent sides. (Each side has a different length.)
Acute	Features three acute angles. (An acute angle measures less than 90°.)
Obtuse	Features one angle measuring larger than 90°.
*/
