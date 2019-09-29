# Cartesian geometry with JavaScript

Exploring the Cartesian coordinate system with JavaScript and TDD.

Our first test `makes a line out of two points` will drive the development of a function that does the following: 
  - receives a couple of ordered pairs as an argument 
	- returns an object with a property `type: 'LINE'` 

Our second test `makes a triangle from three points` drives the development of a function that does the following:
  - receives three ordered pairs as an argument 
	- returns an object with a property `type: 'TRIANGLE'` 

Keeping the test data simple is beneficial for a few reasons. Just using coordinates like `[0, 0], [1, 1]` and `[0, 0], [1, 1], [2, 2]`. This makes the tests easy to reason about, and it helps me to imagine _edge cases_.

The first edge case for the `makeTriangle` function is three points that make a line. In fact, our test data satisfies this condition. The mathematical term for this is _collinear_. 
We will need to write a test for collinear points, and then implement a solution to make that test pass. How can we write code that detects if points are collinear? Mathematics gives us a formula to find the _area of a triangle_. If the area is equal to zero, then the points are collinear and do not form a triangle.

![formula for the area of a triangle](assets/images/area-of-a-triangle.jpg "Area of a triangle")

Another edge case we should account for in the `makeLine` function is two ordered pairs pointing to identical coordinates. That does not make a line.

Once we satisfy those cases with code, we need to update our `'makes a triangle from three points'` test data. We can update the test data value (`coordinates`) by copying the test data from the test for our `areaOfATriangle` function.

```javascript
test('makes a triangle from three points', () => {
    const result = makeTriangle([0, 0], [1, 1], [2, 2]);
    // ...
```

becomes this

```javascript
test('makes a triangle from three points', () => {
    const result = makeTriangle([0, 0], [2, 4], [10, 5]);
    // ...
```

Note that for tests I will assign the return value of a function I want to test to a variable `result`. This keeps test assertion statements short and readable.

We could optionally save the old data values for a _sad path_ test of that function, or another.

When we're dealing with lines and triangles, an essential tool is the _Pythagorean Theorem_:

>In a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.

The hypotenuse is the side opposite the right angle, and it will be the longest side of the triangle.

![Pythagorean Theorem](assets/images/pythagorean-theorem.gif "Pythagorean Theorem")

Before we can use Pythagoras' Theorem, we need to know the length of the sides.

To find the distance between two points, we can use this formula:

![Distance between two points, using Pythagorean Theorem](assets/images/distance-between-two-points.png "Formula to find the distance _D_ between two points")

```javascript
test('calculates the distance between two points', () => {
    const result = distanceBetweenTwoPoints([15, 20], [35, 5]);

    expect(result).toBe(null);
});
```

Also note that I am asserting the value to equal `null`. This is a temporary assertion. Why? To prevent a _false positive_.

A false positive can occur if I don't pass any value to `toEqual()`. All I need to do to make a test pass in this case is to declare and export a function named `distanceBetweenTwoPoints` and ensure I've imported it to the test suite. Here's what that function looks like now:

```javascript
function distanceBetweenTwoPoints(input) {} 
```

The function does nothing, but it can make the test pass if we assert nothing or `undefined`. So we assert a `null` value and prevent a false positive. Now are test is failing, and this is good! We can be confident that we have a legitimate test.

I've decided that I don't want to get granular in testing this `distanceBetweenTwoPoints` function, so I will plug in values from a geometry text book. The distance between points in our test case is `25`, so I will swap out our `null` assertion for `25`.

I update the function signature to take two parameters `pointA` and `pointB`.

```javascript
function distanceBetweenTwoPoints(pointA, pointB) {
    const dx = pointA[0] - pointB[0];         // difference between the points' y-coordinates
    const dy = pointA[1] - pointB[1];         // difference between the points' x-coordinates
    const sumOfDiffs = (dx * dx) + (dy * dy); // add the squares of the difference values

    return Math.sqrt(sumOfDiffs);             // return the square root of the sum
}
```

The test passes! We implement this new function along with the _Converse of the Pythagorean Theorem_ to classify triangles. We want to determine if a triangle is right, equilateral, isosceles, scalene, acute, or obtuse.

_Classification of triangles_ 

|  Triangle   |                              Description                              |
| :---------: | :-------------------------------------------------------------------: |
|    Right    |                        Features one 90° angle.                        |
| Equilateral |        All sides & angles are congruent. (All angles are 60°.)        |
|  Isosceles  |                  Two equal sides & two equal angles.                  |
|   Scalene   |        No congruent sides. (Each side has a different length.)        |
|    Acute    | Features three acute angles. (An acute angle measures less than 90°.) |
|   Obtuse    |             Features one angle measuring larger than 90°.             |

Let's create a function that receives a triangle and appends a `classification` property on the object returned from `makeFunction`.

To test this we need to build our actual data and our mock data to test against it.

This is what our actual or _expected_ data will look like:

```javascript
    const triangle = makeTriangle([0, 0], [2, 4], [10, 5]); // Create a triangle
    const result = classifyTriangle(triangle);              // Invoke our soon to be created `classifyTriangle` function
```

And this is what how we make our mock data:

```javascript
    const triangleMock = makeTriangle([0, 0], [2, 4], [10, 5]); // Create a triangle
    triangleMock["classification"] = null;                      // Append a `classification` property to the triangle
```

And putting it all together in a single test looks like:

```javascript
test('appends a classification property on the object returned from `makeFunction`', () => {
    const triangle = makeTriangle([0, 0], [2, 4], [10, 5]);
    const result = classifyTriangle(triangle);

    const triangleMock = makeTriangle([0, 0], [2, 4], [10, 5]);
    triangleMock["classification"] = null;

    expect(result).toEqual(triangleMock);
});
```

Our function that makes this test pass (once we also export and import the function appropiately):

```javascript
function classifyTriangle(obj) {
    obj["classification"] = null;
    return obj;
}
```

Note that the `classification` property is pointing to a `null` value. We want to expand on this new function so that is dynamically classifies triangles based on their characteristics.