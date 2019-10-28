function square(n) {
  return n * n;
}

function distanceBetweenTwoPoints(pointA) {
  const [Ax, Ay] = pointA;

  return function Two(pointB) {
    const [Bx, By] = pointB;

    const distanceX = Ax - Bx;
    const distanceY = Ay - By;
    const sumOfDiffsSquared = square(distanceX) + square(distanceY);

    return Math.sqrt(sumOfDiffsSquared);
  };
}

module.exports = distanceBetweenTwoPoints;
