import modelFactory from './model-factory';

const ModelSpec = class {
  // Should throw error when no property map specified
  constructor(propertyMap, modelClass = {}) {
    this.propertyMap = propertyMap;
    this.modelClass = modelClass;
  }

  getModels(rows) {
    const models = rows.map((row) => modelFactory.create(this.propertyMap, row, this.modelClass));

    return models;
  }
};

export default ModelSpec;
