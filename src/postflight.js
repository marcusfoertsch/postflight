import ModelSpec from './model-spec';

const Postflight = class {
  constructor(specMap = new Map()) {
    if (specMap instanceof Map) {
      this.specMap = specMap;
    } else {
      throw new Error('specMap must be a Map object');
    }
  }

  addSpec(specConfig) {
    let specName;

    if (specConfig.name) {
      specName = specConfig.name;
    } else {
      throw new Error('Spec must have a name');
    }

    const spec = new ModelSpec(specConfig.propertyMap, specConfig.modelClass);

    this.specMap.set(specName, spec);
  }

  getSpec(modelName) {
    return this.specMap.get(modelName);
  }
};

export default Postflight;
