import { VALIDATOR } from 'validator';

class Breed {
    constructor(name, imageURL, description, childFriendly, grooming, shedding, healthIssues, intelligence) {
        this.name = name;
        this.imageURL = imageURL;
        this.description = description;
        this.childFriendly = childFriendly;
        this.grooming = grooming;
        this.shedding = shedding;
        this.healthIssues = healthIssues;
        this.intelligence = intelligence;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        VALIDATOR.isOfTypeString(value);
        this._name = value;
    }

    get imageURL() {
        return this._imageURL;
    }

    set imageURL(value) {
        VALIDATOR.isOfTypeString(value);
        this._imageURL = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        VALIDATOR.isOfTypeString(value);
        this._description = value;
    }

    get childFriendly() {
        return this._childFriendly;
    }

    set childFriendly(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._childFriendly = value;
    }

    get grooming() {
        return this._grooming;
    }

    set grooming(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._grooming = value;
    }

    get shedding() {
        return this._shedding;
    }

    set shedding(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._shedding = value;
    }

    get healthIssues() {
        return this._healthIssues;
    }

    set healthIssues(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._healthIssues = value;
    }

    get intelligence() {
        return this._intelligence;
    }

    set intelligence(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._intelligence = value;
    }
}

export { Breed }
