const underscoreConvention = (modelProperty, dbColumnName) => {
    const delimiter = '_';

    let propertyNameArray = dbColumnName.split('');

    for (let i = 0; i < propertyNameArray.length; i++) {
        const currentChar = propertyNameArray[i];

        if (currentChar === delimiter && i != propertyNameArray.length - 1) {
            propertyNameArray[i + 1] = propertyNameArray[i + 1].toUpperCase();
            propertyNameArray.splice(i, 1);
        }
    }

    if (modelProperty === propertyNameArray.join("")) {
        return true;
    } else {
        return false;
    }
};

module.exports = underscoreConvention;