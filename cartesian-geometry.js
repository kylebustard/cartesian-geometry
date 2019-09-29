function makeLine(input) {
    if (input.length === 2) {
        if (input[0] == input[1]) {
            return { type: 'ONE_POINT' };
        } else {
            return { type: 'LINE' };
        }
    }
}

function makeTriangle(input) {
    if (input.length === 3) {
        return { type: 'TRIANGLE' };
    }
}

module.exports = { makeLine, makeTriangle };