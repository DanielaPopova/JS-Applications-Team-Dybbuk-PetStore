import { VALIDATOR } from 'validator';
import { CONSTANTS } from 'constants';
import { Breed } from 'breed';

class DogBreed extends Breed {
    constructor(name, imageURL, description, childFriendly, grooming, healthIssues, intelligence,
        appFriendly, exerciseNeeds, trainability, size) {
        super(name, imageURL, description, childFriendly, grooming, healthIssues, intelligence);
        this.appFriendly = appFriendly;        
        this.exerciseNeeds = exerciseNeeds;
        this.trainability = trainability;
		this.size = size;
    }

    get appFriendly() {
        return this._appFriendly;
    }

    set appFriendly(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        this._appFriendly = value;
    }  

    get exerciseNeeds() {
        return this._exerciseNeeds;
    }

    set exerciseNeeds(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        this._exerciseNeeds = value;
    }

    get trainability() {
        return this._trainability;
    }

    set trainability(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        this._trainability = value;
    }
	
	get size() {
        return this._size;
    }

    set size(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isInRange(value, CONSTANTS.DOG_MIN_SIZE, CONSTANTS.DOG_MAX_SIZE);
        this._size = value;
    }
}

export { DogBreed };