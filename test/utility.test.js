const { wrapArgsInSingleArray } = require('../src/utility');

test('wraps arguments in single array', () => {
    const result = wrapArgsInSingleArray(1, 2);

    expect(result.length).toBe(2);
});