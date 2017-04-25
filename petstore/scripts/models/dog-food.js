import { VALIDATOR } from 'validator';
import { CONSTANTS } from 'constants';
import { Food } from 'food';

class DogFood extends Food {
    constructor(name, imageURL, description, price, amountInKg, dogAgeSpecific, dogSizeSpecific) {
        super(name, imageURL, description, price, amountInKg);
        this.dogAgeSpecific = dogAgeSpecific;
        this.dogSizeSpecific = dogSizeSpecific;
    }

    get dogAgeSpecific() {
        return this._dogAgeSpecific;
    }

    set dogAgeSpecific(value) {
        VALIDATOR.checkPetAgeCategory(value, CONSTANTS.DOG_AGE_CATEGORIES);
        this._dogAgeSpecific = value;
    }

    get dogSizeSpecific() {
        return this._dogSizeSpecific;
    }

    set dogSizeSpecific(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.DOG_MIN_SIZE, CONSTANTS.DOG_MAX_SIZE);
        this._dogSizeSpecific = value;
    }
}

export { DogBreed };