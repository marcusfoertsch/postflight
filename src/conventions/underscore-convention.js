const underscoreConvention = (modelProperty, dbColumnName) => {
    const delimiter = '_';
    const propertyNameArray = [...dbColumnName];

    const convertedPropertyNameArray = propertyNameArray.reduce((accumulator, currentValue, currentIndex, sourceArray) => {        
        if (currentValue === delimiter && currentIndex !== sourceArray.length - 1) {
            if (sourceArray[currentIndex - 1] === delimiter) {
                // Break if two underscores in a row
                sourceArray.splice(1);
            }

            return accumulator;
        } else if (sourceArray[currentIndex - 1] === delimiter) {
            accumulator.push(currentValue.toUpperCase());

            return accumulator;
        }

        accumulator.push(currentValue);

        return accumulator;
    }, []);

    if (modelProperty === convertedPropertyNameArray.join('')) {
        return true;
    }

    return false
};

module.exports = underscoreConvention;