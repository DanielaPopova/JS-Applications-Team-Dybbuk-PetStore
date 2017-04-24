import { VALIDATOR } from 'validator';
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
        VALIDATOR.checkCatAge(value);
        this._catAgeSpecific = value;
    }
}

export { CatFood };