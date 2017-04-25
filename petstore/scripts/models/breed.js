import { VALIDATOR } from 'validator';
import { CONSTANTS } from 'constants';

class Breed {
    constructor(name, imageURL, description, childFriendly, grooming, healthIssues, intelligence) {
        this.name = name;
        this.imageURL = imageURL;
        this.description = description;
        this.childFriendly = childFriendly;
        this.grooming = grooming;        
        this.healthIssues = healthIssues;
        this.intelligence = intelligence;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        VALIDATOR.isNonEmptyString(value);
        VALIDATOR.hasInvalidSymbols(value);
        VALIDATOR.isInRange(value.length, CONSTANTS.BREED_NAME_MIN_LENGTH, CONSTANTS.BREED_NAME_MIN_LENGTH);
        this._name = value;
    }

    get imageURL() {
        return this._imageURL;
    }

    set imageURL(value) {
        VALIDATOR.isNonEmptyString(value);
        this._imageURL = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        VALIDATOR.isNonEmptyString(value);
        VALIDATOR.isInRange(value, CONSTANTS.DESCRIPTION_MIN_LENGTH, CONSTANTS.DESCRIPTION_MAX_LENGTH);
        this._description = value;
    }

    get childFriendly() {
        return this._childFriendly;
    }

    set childFriendly(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        this._childFriendly = value;
    }

    get grooming() {
        return this._grooming;
    }

    set grooming(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        this._grooming = value;
    }  

    get healthIssues() {
        return this._healthIssues;
    }

    set healthIssues(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        this._healthIssues = value;
    }

    get intelligence() {
        return this._intelligence;
    }

    set intelligence(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        this._intelligence = value;
    }
}

export { Breed };
