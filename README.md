# Cartesian geometry with JavaScript

Exploring the Cartesian coordinate system with JavaScript and TDD.

Our first test `makes a line out of two points` will drive the development of a function that does the following: 
  - receives a couple of ordered pairs as an argument 
	- returns an object with a property `type: 'LINE'` if input is two points

Our second test `makes a triangle from three points` drives the development of a function that does the following:
  - receives three ordered pairs as an argument
	- returns an object with a property `type: 'TRIANGLE'` if input contains three points

Keeping the test data simple is beneficial for a few reasons. Just using coordinates like `[[0, 0], [1, 1]]` and `[[0, 0], [1, 1], [2, 2]]`. This makes the tests easy to reason about, and it helps me to imagine _edge cases_.

The first edge case for the `makeTriangle` function is three points that make a line. In fact, our test data satisfies this condition. The mathematical term for this is _collinear_. 
We will need to write a test for collinear points, and then implement a solution to make that test pass. How can we write code that detects if points are collinear? Mathematics gives us a formula to find the _area of a triangle_. If the area is equal to zero, then the points are collinear and do not form a triangle.

![formula for the area of a triangle](assets/images/area-of-a-triangle.jpg "Area of a triangle")

Another edge case we should account for in the `makeLine` function is two ordered pairs pointing to identical coordinates. That does not make a line.

Once we satisfy those cases with code, we need to update our `'makes a triangle from three points'` test data. We can update the test data value (`coordinates`) by copying the test data from the test for our `areaOfATriangle` function.

```javascript
test('makes a triangle from three points', () => {
    const coordinates = [[0, 0], [1, 1], [2, 2]];
    ...
```

becomes this

```javascript
test('makes a triangle from three points', () => {
    const coordinates = [[0, 0], [2, 4], [10, 5]];
    ...
```

We could optionally save the old data values for a _sad path_ test of that function, or another.