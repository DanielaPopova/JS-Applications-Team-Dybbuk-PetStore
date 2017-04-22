class DogBreed {
    constructor(breedName, coatLength, activityLevel, trainability, description) {
        if (typeof breedName != 'string') {
            throw new Error('breedName must be string');
        }

        this._breedName = breedName;

        if (Object.values(CoatLengthEnum).indexOf(coatLength) < 0) {
            throw new Error(`coatLength (value ${coatLength}) does not exist in CoatLengthEnum`);
        }

        this._coatLength = coatLength;

        if (Object.values(ActivityLevelEnum).indexOf(activityLevel) < 0) {
            throw new Error(`coatLength (value ${activityLevel}) does not exist in ActivityLevelEnum`);
        }

        this._activityLevel = activityLevel;

        if (Object.values(TrainabilityEnum).indexOf(trainability) < 0) {
            throw new Error(`coatLength (value ${trainability}) does not exist in TrainabilityEnum`);
        }

        this._trainability = trainability;

        if (typeof description != 'string') {
            throw new Error('description must be string');
        }
        this._description = description;
    }

    get breedName() {
        return this._breedName;
    }

    get coatLength() {
        return this._coatLength;
    }

    get activityLevel() {
        return this._activityLevel;
    }

    get trainability() {
        return this._trainability;
    }

    get description() {
        return this._description;
    }
}