import { VALIDATOR } from 'validator';
import { Breed } from 'breed';

class DogBreed extends Breed {
    constructor(name, imageURL, description, childFriendly, grooming, shedding, healthIssues, intelligence,
        appFriendly, barking, exerciseNeeds, trainability, size) {
        super(name, imageURL, description, childFriendly, grooming, shedding, healthIssues, intelligence);
        this.appFriendly = appFriendly;
        this.barking = barking;
        this.exerciseNeeds = exerciseNeeds;
        this.trainability = trainability;
		this.size = size;
    }

    get appFriendly() {
        return this._appFriendly;
    }

    set appFriendly(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._appFriendly = value;
    }

    get barking() {
        return this._barking;
    }

    set barking(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._barking = value;
    }

    get exerciseNeeds() {
        return this._exerciseNeeds;
    }

    set exerciseNeeds(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._exerciseNeeds = value;
    }

    get trainability() {
        return this._trainability;
    }

    set trainability(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 5);
        this._trainability = value;
    }
	
	get size() {
        return this._size;
    }

    set size(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, 1, 4);
        this._size = value;
    }
}

export { DogBreed };