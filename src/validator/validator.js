const utils = require('../utils/utils');

const validator = {
    rows: (rows) => {
        if (!rows || rows.length === 0) {
            throw new Error('No rows provided.');
        } else {
            return;
        }
    },
    modelDefinition: (modelDefinition) => {
        if (utils.isObjectEmptyOrNull(modelDefinition)) {
            throw new Error('No model definition provided');
        } else {
            return;
        }
    }
};

module.exports = validator;