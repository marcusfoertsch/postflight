 const exactStrategy = (propertyName, dbColumnName) => {
    if (propertyName === dbColumnName) {
        return true;
    } else {
        return false;
    }
};

module.exports = exactStrategy;