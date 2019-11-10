const modelFactory = {
  create: (propertyMap, row, ModelClass = null) => {
    let model;

    if (ModelClass) {
      model = new ModelClass();
    } else {
      model = {};
    }

    propertyMap.forEach((column, property) => {
      model[property] = row[column];
    });

    return model;
  },
};

export default modelFactory;
