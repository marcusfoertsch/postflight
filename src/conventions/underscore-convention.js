const underscoreConvention = (modelProperty, dbColumnName) => {
  const delimiter = '_';
  const columnChars = [...dbColumnName];

  const mappedColumnChars = columnChars.reduce((accumulator, currentValue, index, source) => {
    if (currentValue === delimiter && index !== source.length - 1) {
      // Do not assume repeated underscores map to camel cased property
      if (source[index - 1] === delimiter) {
        accumulator.push(delimiter);

        return accumulator;
      }

      return accumulator;
    }

    if (source[index - 1] === delimiter) {
      accumulator.push(currentValue.toUpperCase());

      return accumulator;
    }

    accumulator.push(currentValue);

    return accumulator;
  }, []);

  if (modelProperty === mappedColumnChars.join('')) {
    return true;
  }

  return false;
};

export default underscoreConvention;
