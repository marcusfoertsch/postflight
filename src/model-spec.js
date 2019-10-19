const modelFactory = require('./model-factory');

const ModelSpec = class {

    // Should throw error when no property map specified
    constructor(propertyMap, modelClass) {
        this._propertyMap = propertyMap;
        this._modelClass = modelClass || {};
    }

    getModels(rows) {
        const models = rows.map(row => {
            return modelFactory.create(this._propertyMap, row, this._modelClass);
        });

        return models;
    }
};

module.exports = ModelSpec;