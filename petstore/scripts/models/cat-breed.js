import { VALIDATOR } from 'validator';
import { CONSTANTS } from 'constants';
import { Breed } from 'breed';

class CatBreed extends Breed {
    constructor(name, imageURL, description, childFriendly, grooming, healthIssues, intelligence,
        energyLevel, adaptability, affectionLevel) {
        super(name, imageURL, description, childFriendly, grooming, healthIssues, intelligence);
        this.energyLevel = energyLevel;
        this.adaptability = adaptability;
        this.affectionLevel = affectionLevel;
    }

    get energyLevel() {
        return this._energyLevel;
    }

    set energyLevel(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        this._energyLevel = value;
    }

    get adaptability() {
        return this._adaptability;
    }

    set adaptability(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        this._adaptability = value;
    }

    get affectionLevel() {
        return this._affectionLevel;
    }

    set affectionLevel(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        this._affectionLevel = value;
    }
}

export { CatBreed };