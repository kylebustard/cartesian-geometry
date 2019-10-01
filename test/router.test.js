const { wrapArgsInSingleArray } = require('../src/utility');
const { router } = require('../src/router');

xdescribe('Router', () => {
    test('two ordered pairs invoke `makeLine`', () => {
        const result = wrapArgsInSingleArray(router, [0, 0], [1, 2]);

        expect(result).toBe(2);
    })
})