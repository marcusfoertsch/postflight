const utils = {
    isObjectEmptyOrNull(obj) {
        return obj === null || Object.entries(obj).length === 0 && obj.constructor === Object;
    }
};

module.exports = utils;