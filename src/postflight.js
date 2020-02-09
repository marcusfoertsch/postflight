import ModelSpec from './model-spec';

const postflight = {
  specMap: new Map(),
  addSpec(name, specConfig) {
    if (!name) {
      throw new Error('Spec must have a name');
    }

    const spec = new ModelSpec(specConfig.propertyMap, specConfig.modelClass);

    this.specMap.set(name, spec);
  },
  getSpec(modelName) {
    return this.specMap.get(modelName);
  },

};

export default postflight;
