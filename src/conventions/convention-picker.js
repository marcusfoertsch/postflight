import underscoreConvention from './underscore-convention';
import PostflightConvention from '../enums/convention-enum';

const conventionPicker =  (postflightConvention) => {
    switch (postflightConvention) {
        case PostflightConvention.underscore:
            return underscoreConvention;
        default:
            throw new Error('Not a valid convention');
    }
};

export default conventionPicker;