const underscoreConvention = require('./underscore-convention');
const PostflightConvention = require('../enums/convention-enum');

const conventionPicker =  (postflightConvention) => {
    switch (postflightConvention) {
        case PostflightConvention.underscore:
            return underscoreConvention;
        default:
            throw new Error('Not a valid convention');
    }
};

module.exports = conventionPicker;