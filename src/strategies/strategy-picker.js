const underscoreStrategy = require('./underscore-strategy');
const PostflightStrategy = require('./../enums/strategy-enum');

const strategyPicker =  (postflightStrategy) => {
    switch (postflightStrategy) {
        case PostflightStrategy.underscore:
            return underscoreStrategy;
        default:
            throw new Error('Not a valid strategy');
    }
};

module.exports = strategyPicker;