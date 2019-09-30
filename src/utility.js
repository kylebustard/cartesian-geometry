function wrapArgsInSingleArray(...args) {
    let argsInSingleArray = [];
    for (let i = 0; i < args.length; i++) {
        argsInSingleArray.push(args[i]);
    }

    return argsInSingleArray;
}

module.exports = { wrapArgsInSingleArray }