import { VALIDATOR } from 'validator';
import { CONSTANTS } from 'constants';
import { Food } from 'food';

class CatFood extends Food {
    constructor(name, imageURL, description, price, amountInKg, catAgeSpecific) {
        super(name, imageURL, description, price, amountInKg);
        this.catAgeSpecific = catAgeSpecific;
    }

    get catAgeSpecific() {
        return this._catAgeSpecific;
    }

    set catAgeSpecific(value) {
        VALIDATOR.checkPetAgeCategory(value, CONSTANTS.CAT_AGE_CATEGORIES);
        this._catAgeSpecific = value;
    }
}

export { CatFood };