const VALIDATOR = {
    isNonEmptyString: function (str) {
        if (!str || typeof str !== 'string') {
            throw new Error(`${str} must be a string!`);
        } else {
            let trimmed = str.trim();
            if (trimmed.length === 0) {
                throw new Error(`${str} cannot be empty string!`);
            }
        }
    },
    hasInvalidSymbols: function (str) {
        let regex = /[^a-zA-Z ]/;
        if (str.match(regex)) {
            throw new Error(`${str} contains invalid symbols!`);
        }
    },
    isOfTypeNumber: function (num) {
        if (typeof num !== 'number') {
            throw new Error(`${num} must be a number!`);
        }
    },
    isNegativeNumber: function (num) {
        if (num < 0) {
            throw new Error(`${num} cannot be negative!`);
        }
    },
    isInRange: function (value, min, max) {
        if (value < min || value > max) {
            throw new Error(`${value} should be in range ${min} - ${max}`);
        }
    },
    checkPetAgeCategory: function(value, petAgeCategories){        
        if(!petAgeCategories.includes(value.toLowerCase())){
            throw new Error(`${value} is not a pet age category! Choose one out of ${petAgeCategories}`);
        }
    },
    checkDogSizeCategory: function(value, dogSizeCategories){
        if(!dogSizeCategories.includes(value.toLowerCase())){
            throw new Error(`${value} is not a dog size category! Choose one out of ${dogSizeCategories}`);
        }
    }
};

export { VALIDATOR };