function wrapArgsInSingleArray(cb, ...args) {
    let argsInSingleArray = [];
    for (let i = 0; i < args.length; i++) {
        argsInSingleArray.push(args[i]);
    }

    return cb(argsInSingleArray);
}

function router(data) {
    const arr = wrapArgsInSingleArray(data);

    if (arr.length === 2) {
        return 2;
    } else if (arr.length === 3) {
        return 3;
    }
}

module.exports = { wrapArgsInSingleArray, router }