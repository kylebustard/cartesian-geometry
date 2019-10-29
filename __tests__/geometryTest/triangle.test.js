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
    const equilateralTriangle1 = [[-4, 0], [4, 0], [0, 4 * Math.sqrt(3)]];
    const equilateralTriangle2 = [[2, 4], [2, 6], [2 + Math.sqrt(3), 5]];

    xit('equilateral', () => {
      const result = makeTriangle(equilateralTriangle2);

      expect(result).toMatchObject({ classification: EQUILATERAL });
    });
  });

  describe('when two equal sides and two equal angles', () => {
    const isoscelesTriangle = [[0, 0], [2, 2], [4, 0]];

    it('isosceles', () => {
      const result = makeTriangle(isoscelesTriangle);

      expect(result).toMatchObject({ classification: ISOSCELES });
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
