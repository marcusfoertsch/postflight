import utils from '../utils/utils';

const validator = {
  rows: (rows) => {
    if (!rows || rows.length === 0) {
      throw new Error('No rows provided.');
    }
  },
  modelDefinition: (modelDefinition) => {
    if (utils.isObjectEmptyOrNull(modelDefinition)) {
      throw new Error('No model definition provided');
    }
  },
};

export default validator;
