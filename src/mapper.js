const mapper = {
    getMapping: (modelObject, row, strategy) => {
        const propertyMap = new Map();
        
        Object.keys(modelObject).map(propertyName => {
            let isInStrategy = false;

            Object.keys(row).map(columnName => {
                if (strategy(propertyName, columnName)) {
                    propertyMap.set(propertyName, columnName);

                    isInStrategy = true;
                }
            });

            if (!isInStrategy) {
                throw new Error('Column name does not fit strategy');
            }
        });
        
        return propertyMap;
    }
};

export default mapper;