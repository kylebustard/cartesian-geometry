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

#### Classification of triangles

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

This is what our actual result data will look like:

```javascript
    const triangle = makeTriangle([0, 0], [2, 4], [10, 5]); // Create a triangle
    const result = classifyTriangle(triangle);              // Invoke our soon to be created `classifyTriangle` function
```

And this is what how we make our mock data or our **exptected** data:

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

Our function that makes this test pass:

```javascript
function classifyTriangle(obj) {
    obj["classification"] = null;
    return obj;
}
```

>💡Don't forget to export and import the function appropiately!

Note that the `classification` property is pointing to a `null` value. We want to expand on this new function so that it dynamically classifies triangles based on their characteristics. We need tests cases to drive development of classifications of different kinds of triangles. 

We will use a `describe` test block to group the classification tests together.

```javascript
describe('Triangle classification', () => {
  // The test for `classifyTriangle` and other related tests will be placed inside here.
  // ...
}
```

Referring back to our [Classification of triangles](#classification-of-triangles) table, we will make constant variables assigned to each of the types of triangles.

```shell
$ mkdir constants
$ touch constants/triangleTypes.js
```

Add this to `constants/triangleTypes.js`:

```javascript
const RIGHT = 'RIGHT';
const EQUILATERAL = 'EQUILATERAL';
const ISOSCELES = 'ISOSCELES';
const SCALENE = 'SCALENE';
const ACUTE = 'ACUTE';
const OBTUSE = 'OBTUSE';

module.exports = {
    RIGHT, EQUILATERAL, ISOSCELES, SCALENE, ACUTE, OBTUSE
};
```

Finally, add this line at or near the top of both your source code and test file:

```javascript
const triangleTypes = require('./constants/triangleTypes');
// ... 
```

Now we can use the constants like this `triangleTypes.ACUTE` and with that we get some a few benefits such as: 
- No errors from mispelling a string (e.g., `'ISOCELES'` and `'EQIULATERAL'`).
- Utilizing features from our favorite text editor or IDE where we can start typing `triangeTypes.` then have a list of constants pop up to select from, and hit the `tab` key for autocomplete.
- By importing constants into our source code and test file, we get consistency.

Back to our `describe` test which will contain the block of tests pertaining to the classification of triangles, I've decided that I want to put a pause on writing these tests. For now we will _skip_ these tests and direct out focus elsewhere.

Your test framework should have a simple mechanism for skipping tests. I am using Jest, and Jest skips tests by prefixing an `x` to a test like `xtest` or `xdescribe`. I will prefix an `x` to the first line of my tests for triangle classification like this:

```javascript
xdescribe('Triangle classification', () => {
  // ...
```

And now any tests nested inside this test will also be skipped.

## Implementing a helper function 

At some point we will need to validate the number of arguments passed to our functions. A line expects two ordered pairs, and a triangle expects three ordered pairs. There are a few ways we could go about this. For example, validation could be handled by a client application or it could be handled on the server. Since this is a Node.js application (at least for the time being) we will keep the validation server-side. However, if we turn this into a full-stack web application with then we could implement validation on the client via HTML forms at the time an HTML `submit` button is clicked. If we're using a UI library like React.js, then it is relatively easy to handle validation in real-time as it is being input by a user.

Remembering that we decided to handle validation server-side, we have more options still. Each function could handle validation on it's own, or we could make a pipeline that receives any and all data, wraps it into an array, and routes and passes it to the appropiate function based on the number of ordered pairs contained in the array. We will choose the former.

We will test that a helper function `'wrap arguments in single array'`. This helper function is generic and doesn't do anything specific to geometry, but we can still group it in a context that will make it distinct from the rest of the code.

### Tidying up

Now we need to do some tidying up. Running the `ls` command shows all our of files, and you may imagine how cluttered our project directory could become if don't get a handle on it now.

I'm going to create a folder for all of the source code. There is no standard convention, but popular names for JavaScript source code folders include `app`, `lib`, or `src`. I'm going with the final option.

```shell
$ mkdir src
```

Now we move all our `.js` files into our new `src` folder, **however** we don't want to include any `.test.js` files. RegEx (_regular expressions_) are a powerful for computer programming. There are awesome tools such as [regex101](https://regex101.com/), but if I'm already a bit confident in a RegEx pattern I will test it with a `read only` command like `ls` before I do any `write` or delete actions like `mv` or `rm`.

```shell
$ ls *[^test].js
```

The RegEx pattern above matches on all files ending in `.js` _excluding_ `*.test.js` files. Running `ls` confirms this by listing only the appropiate files. Now that we are confident with our RegEx pattern, we can use it to move files into the new `src/`.

```shell
$ mv *[^test].js src/
```

Finally, we need to put our test files somewhere. Let's create a `test/` folder.

```shell
$ mkdir test
```

Now we move the test files into `test/`.

```shell
$ mv *test.js test/
```