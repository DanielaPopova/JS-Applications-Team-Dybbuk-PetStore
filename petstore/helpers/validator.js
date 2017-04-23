const VALIDATOR = {
    isOfTypeString: function (str) {
        if (!str || typeof str !== 'string') {
            throw new Error('Value must be a string!');
        }
    },
    isOfTypeNumber: function (num) {
        if (typeof num !== 'number') {
            throw new Error('Value must be a number!');
        }
    },
    isInRange: function (value, min, max) {
        if (value < min || value > max) {
            throw new Error(`Value should be in range ${min} - ${max}`);
        }
    }
};

export { VALIDATOR };