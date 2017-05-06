const VALIDATOR = (() => {

    function isNonEmptyString(str) {
        if (!str || typeof str !== 'string') {
            throw new Error(`Value must be a string!`);
        } else {
            let trimmed = str.trim();
            if (trimmed.length === 0) {
                throw new Error(`Value cannot be empty string!`);
            }
        }
    };

    function hasInvalidSymbols(str) {
        let regex = /[^a-zA-Z ]/;
        if (str.match(regex)) {
            throw new Error(`${str} contains invalid symbols!`);
        }
    };

    function isOfTypeNumber(num) {
        if (typeof num !== 'number') {
            throw new Error(`${num} must be a number!`);
        }
    };

    function isNegativeNumber(num) {
        if (num < 0) {
            throw new Error(`${num} cannot be negative!`);
        }
    };

    function isInRange(value, min, max) {
        if (value < min || value > max) {
            throw new Error(`${value} should be in range ${min} - ${max}`);
        }
    };

    function checkPetAgeCategory(value, petAgeCategories) {
        if (!petAgeCategories.includes(value.toLowerCase())) {
            throw new Error(`${value} is not a pet age category! Choose one out of ${petAgeCategories}`);
        }
    };

    function checkDogSizeCategory(value, dogSizeCategories) {
        if (!dogSizeCategories.includes(value.toLowerCase())) {
            throw new Error(`${value} is not a dog size category! Choose one out of ${dogSizeCategories}`);
        }
    };

    return {
        isNonEmptyString,
        hasInvalidSymbols,
        isOfTypeNumber,
        isNegativeNumber,
        isInRange,
        checkPetAgeCategory,
        checkDogSizeCategory
    }

})();

export { VALIDATOR };