import { VALIDATOR } from 'validator';
import { Breed } from 'breed';

class CatBreed extends Breed {
    constructor(name, imageURL, description, childFriendly, grooming, shedding, healthIssues, intelligence,
        energyLevel, adaptability, affectionLevel) {
        super(name, imageURL, description, childFriendly, grooming, shedding, healthIssues, intelligence);
        this.energyLevel = energyLevel;
        this.adaptability = adaptability;
        this.affectionLevel = affectionLevel;
    }

    get energyLevel() {
        return this._energyLevel;
    }

    set energyLevel(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._energyLevel = value;
    }

    get adaptability() {
        return this._adaptability;
    }

    set adaptability(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._adaptability = value;
    }

    get affectionLevel() {
        return this._affectionLevel;
    }

    set affectionLevel(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._affectionLevel = value;
    }
}

export { CatBreed };