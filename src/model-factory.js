const modelFactory = {
    create: (propertyMap, row, modelClass = null) => {
        let model;

        if (modelClass) {
            model = new modelClass();
        }   else {
            model = {};
        }

        propertyMap.forEach((column, property) => {
            model[property] = row[column];
        });

        return model;
    }
};

export default modelFactory;