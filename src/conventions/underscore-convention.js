const underscoreConvention = (modelProperty, dbColumnName) => {
    const delimiter = '_';
    const propertyNameArray = [...dbColumnName];

    const convertedPropertyNameArray = propertyNameArray.reduce((accumulator, currentValue, currentIndex, sourceArray) => {        
        if (currentValue === delimiter && currentIndex !== sourceArray.length - 1) {
            // Do not assume repeated underscores map to camel cased property
            if (sourceArray[currentIndex - 1] === delimiter) {
                accumulator.push(delimiter);
                
                return accumulator;
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

export default underscoreConvention;