import { VALIDATOR } from 'validator';
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
        VALIDATOR.checkDogAge(value);
        this._dogAgeSpecific = value;
    }

    get dogSizeSpecific() {
        return this._dogSizeSpecific;
    }

    set dogSizeSpecific(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 4);
        this._dogSizeSpecific = value;
    }
}

export { DogBreed };