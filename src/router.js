const wrapArgsInSingleArray = require('./utility');

function router(data) {
    const arr = wrapArgsInSingleArray(data);

    if (arr.length === 2) {
        return 2;
    } else if (arr.length === 3) {
        return 3;
    }
}

module.exports = { router }