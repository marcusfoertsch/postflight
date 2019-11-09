 const exactStrategy = (propertyName, dbColumnName) => {
    if (propertyName === dbColumnName) {
        return true;
    } else {
        return false;
    }
};

export default exactStrategy;