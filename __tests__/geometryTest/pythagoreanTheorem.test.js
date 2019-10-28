const distanceBetweenTwoPoints = require('../../src/geometry/pythagoreanTheorem');

describe('given two points', () => {
  it('calculates distance', () => {
    const result = distanceBetweenTwoPoints([15, 20])([35, 5]);

    expect(result).toBe(25);
  });
});
