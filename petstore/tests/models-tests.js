import { VALIDATOR } from 'validator';
import { CONSTANTS } from 'constants';
import { Product } from 'product';
import { Food } from 'food';
import { CatFood } from 'cat-food';
import { DogFood } from 'dog-food';
import { Breed } from 'breed';
import { DogBreed } from 'dog-breed';
import { CatBreed } from 'cat-breed';

describe('Models tests', () => {
    describe('Product tests', () => {
        let validatorEmptyStringStub;
        let validatorInRangeStub;
        let validatorIsTypeNumberStub;
        let validatorIsNegativeStub;

        beforeEach(() => {
            validatorEmptyStringStub = sinon.stub(VALIDATOR, 'isNonEmptyString');
            validatorInRangeStub = sinon.stub(VALIDATOR, 'isInRange');
            validatorIsTypeNumberStub = sinon.stub(VALIDATOR, 'isOfTypeNumber');
            validatorIsNegativeStub = sinon.stub(VALIDATOR, 'isNegativeNumber');
        });

        afterEach(() => {
            validatorEmptyStringStub.restore();
            validatorInRangeStub.restore();
            validatorIsTypeNumberStub.restore();
            validatorIsNegativeStub.restore();
        });

        it('Expect product to be created with passed initial properties when valid properties are provided', () => {
            const expectedName = "Product name";
            const expectedImageURL = "product-pic.png";
            const expectedDescription = "Product description";
            const expectedPrice = 666.66;
            const expectedProductDetailPath = "product-details.html";

            const sut = new Product(expectedName, expectedImageURL, expectedDescription, expectedPrice, expectedProductDetailPath)

            expect(sut.name).to.equal(expectedName);
            expect(sut.imageURL).to.equal(expectedImageURL);
            expect(sut.description).to.equal(expectedDescription);
            expect(sut.price).to.equal(expectedPrice);
            expect(sut.productDetailPath).to.equal(expectedProductDetailPath);
        });

        it('Expect product to be deep equal to when created with another product as it\'s passed to its constructor', () => {
            const validName = "Product name";
            const validImageURL = "product-pic.png";
            const validDescription = "Product description";
            const validPrice = 666.66;
            const validProductDetailPath = "product-details.html";
            const validProduct = new Product(validName, validImageURL, validDescription, validPrice, validProductDetailPath)
            const sut = new Product(validProduct);

            expect(sut).to.deep.equal(validProduct);
        });

        it('Expect product constructor to call validator for name parameter with the name string', () => {
            const validName = "Product name";
            const validImageURL = "product-pic.png";
            const validDescription = "Product description";
            const validPrice = 666.66;
            const validProductDetailPath = "product-details.html";

            const sut = new Product(validName, validImageURL, validDescription, validPrice, validProductDetailPath)

            expect(validatorEmptyStringStub).to.have.been.calledWith(validName);
        });

        it('Expect product constructor to call validator for image url parameter with the image url string', () => {
            const validName = "Product name";
            const validImageURL = "product-pic.png";
            const validDescription = "Product description";
            const validPrice = 666.66;
            const validProductDetailPath = "product-details.html";

            const sut = new Product(validName, validImageURL, validDescription, validPrice, validProductDetailPath)

            expect(validatorEmptyStringStub).to.have.been.calledWith(validImageURL);
        });

        it('Expect product constructor to call validator for description parameter with the description string', () => {
            const validName = "Product name";
            const validImageURL = "product-pic.png";
            const validDescription = "Product description";
            const validPrice = 666.66;
            const validProductDetailPath = "product-details.html";

            const sut = new Product(validName, validImageURL, validDescription, validPrice, validProductDetailPath)

            expect(validatorEmptyStringStub).to.have.been.calledWith(validDescription);
        });

        it('Expect product constructor to call validator for description parameter with the the length of the string and appropriate length constants', () => {
            const validName = "Product name";
            const validImageURL = "product-pic.png";
            const validDescription = "Product description";
            const validPrice = 666.66;
            const validProductDetailPath = "product-details.html";

            const sut = new Product(validName, validImageURL, validDescription, validPrice, validProductDetailPath)

            expect(validatorInRangeStub).to.have.been.calledWith(validDescription.length, CONSTANTS.DESCRIPTION_MIN_LENGTH, CONSTANTS.DESCRIPTION_MAX_LENGTH);
        });

        it('Expect product constructor to call validators for price parameter with the passed price', () => {
            const validName = "Product name";
            const validImageURL = "product-pic.png";
            const validDescription = "Product description";
            const validPrice = 666.66;
            const validProductDetailPath = "product-details.html";

            const sut = new Product(validName, validImageURL, validDescription, validPrice, validProductDetailPath)

            expect(validatorIsTypeNumberStub).to.have.been.calledWith(validPrice);
            expect(validatorIsNegativeStub).to.have.been.calledWith(validPrice);
        });
    });

    describe('Food tests', () => {
        let validatorIsTypeNumberStub;
        let validatorIsNegativeStub;

        beforeEach(() => {
            validatorIsTypeNumberStub = sinon.stub(VALIDATOR, 'isOfTypeNumber');
            validatorIsNegativeStub = sinon.stub(VALIDATOR, 'isNegativeNumber');
        });

        afterEach(() => {
            validatorIsTypeNumberStub.restore();
            validatorIsNegativeStub.restore();
        });

        it('Expect food properties to be set correctly when constructor is invoked', () => {
            const expectedName = "Product name";
            const expectedImageURL = "product-pic.png";
            const expectedDescription = "Product description";
            const expectedPrice = 666.66;
            const expectedAmountInKg = 1.4;

            const sut = new Food(expectedName, expectedImageURL, expectedDescription, expectedPrice, expectedAmountInKg);

            expect(sut.name).to.equal(expectedName);
            expect(sut.imageURL).to.equal(expectedImageURL);
            expect(sut.description).to.equal(expectedDescription);
            expect(sut.price).to.equal(expectedPrice);
            expect(sut.amountInKg).to.equal(expectedAmountInKg);
        });

        it('Expect validation for type number to be invoked for amount in kg when constructor is invoked', () => {
            const expectedName = "Product name";
            const expectedImageURL = "product-pic.png";
            const expectedDescription = "Product description";
            const expectedPrice = 666.66;
            const expectedAmountInKg = 1.4;

            const sut = new Food(expectedName, expectedImageURL, expectedDescription, expectedPrice, expectedAmountInKg);

            expect(validatorIsTypeNumberStub).to.have.been.calledWith(expectedAmountInKg);
        });

        it('Expect validation for negative amount to be invoked for amount in kg when constructor is invoked', () => {
            const expectedName = "Product name";
            const expectedImageURL = "product-pic.png";
            const expectedDescription = "Product description";
            const expectedPrice = 666.66;
            const expectedAmountInKg = 1.4;

            const sut = new Food(expectedName, expectedImageURL, expectedDescription, expectedPrice, expectedAmountInKg);

            expect(validatorIsNegativeStub).to.have.been.calledWith(expectedAmountInKg);
        });
    });

    describe('Cat food tests', () => {
        let validatorPetAgeCategoryStub;

        beforeEach(() => {
            validatorPetAgeCategoryStub = sinon.stub(VALIDATOR, 'checkPetAgeCategory');
        });

        afterEach(() => {
            validatorPetAgeCategoryStub.restore();
        });

        it('Expect food properties to be set correctly when constructor is invoked', () => {
            const expectedName = "Product name";
            const expectedImageURL = "product-pic.png";
            const expectedDescription = "Product description";
            const expectedPrice = 666.66;
            const expectedAmountInKg = 1.4;
            const expectedCatAgeSpecific = CONSTANTS.CAT_AGE_CATEGORIES[0];

            const sut = new CatFood(expectedName, expectedImageURL, expectedDescription, expectedPrice, expectedAmountInKg, expectedCatAgeSpecific);

            expect(sut.name).to.equal(expectedName);
            expect(sut.imageURL).to.equal(expectedImageURL);
            expect(sut.description).to.equal(expectedDescription);
            expect(sut.price).to.equal(expectedPrice);
            expect(sut.amountInKg).to.equal(expectedAmountInKg);
            expect(sut.catAgeSpecific).to.equal(expectedCatAgeSpecific);
        });

        it('Expected pet age category validation to be called when food object is constructed', () => {
            const expectedName = "Product name";
            const expectedImageURL = "product-pic.png";
            const expectedDescription = "Product description";
            const expectedPrice = 666.66;
            const expectedAmountInKg = 1.4;
            const expectedCatAgeSpecific = CONSTANTS.CAT_AGE_CATEGORIES[0];

            const sut = new CatFood(expectedName, expectedImageURL, expectedDescription, expectedPrice, expectedAmountInKg, expectedCatAgeSpecific);

            expect(validatorPetAgeCategoryStub).to.have.been.calledWith(expectedCatAgeSpecific, CONSTANTS.CAT_AGE_CATEGORIES);
        });
    });

    describe('Dog food tests', () => {
        let validatorPetAgeCategoryStub;
        let validatorDogSizeCategory;

        beforeEach(() => {
            validatorPetAgeCategoryStub = sinon.stub(VALIDATOR, 'checkPetAgeCategory');
            validatorDogSizeCategory = sinon.stub(VALIDATOR, 'checkDogSizeCategory');
        });

        afterEach(() => {
            validatorPetAgeCategoryStub.restore();
            validatorDogSizeCategory.restore();
        });

        it('Expect food properties to be set correctly when constructor is invoked', () => {
            const expectedName = "Product name";
            const expectedImageURL = "product-pic.png";
            const expectedDescription = "Product description";
            const expectedPrice = 666.66;
            const expectedAmountInKg = 1.4;
            const expectedDogAgeSpecific = CONSTANTS.DOG_AGE_CATEGORIES[0];
            const expectedDogSizeSpecific = CONSTANTS.DOG_AVAILABLE_SIZE[0];

            const sut = new DogFood(expectedName, expectedImageURL, expectedDescription, expectedPrice, expectedAmountInKg, expectedDogAgeSpecific, expectedDogSizeSpecific);

            expect(sut.name).to.equal(expectedName);
            expect(sut.imageURL).to.equal(expectedImageURL);
            expect(sut.description).to.equal(expectedDescription);
            expect(sut.price).to.equal(expectedPrice);
            expect(sut.amountInKg).to.equal(expectedAmountInKg);
            expect(sut.dogAgeSpecific).to.equal(expectedDogAgeSpecific);
            expect(sut.dogSizeSpecific).to.equal(expectedDogSizeSpecific);
        });

        it('Expected pet age category validation to be called when food object is constructed', () => {
            const expectedName = "Product name";
            const expectedImageURL = "product-pic.png";
            const expectedDescription = "Product description";
            const expectedPrice = 666.66;
            const expectedAmountInKg = 1.4;
            const expectedDogAgeSpecific = CONSTANTS.DOG_AGE_CATEGORIES[0];
            const expectedDogSizeSpecific = CONSTANTS.DOG_AVAILABLE_SIZE[0];

            const sut = new DogFood(expectedName, expectedImageURL, expectedDescription, expectedPrice, expectedAmountInKg, expectedDogAgeSpecific, expectedDogSizeSpecific);

            expect(validatorPetAgeCategoryStub).to.have.been.calledWith(expectedDogAgeSpecific, CONSTANTS.DOG_AGE_CATEGORIES);
        });

        it('Expected dog size category validation to be called when food object is constructed', () => {
            const expectedName = "Product name";
            const expectedImageURL = "product-pic.png";
            const expectedDescription = "Product description";
            const expectedPrice = 666.66;
            const expectedAmountInKg = 1.4;
            const expectedDogAgeSpecific = CONSTANTS.DOG_AGE_CATEGORIES[0];
            const expectedDogSizeSpecific = CONSTANTS.DOG_AVAILABLE_SIZE[0];

            const sut = new DogFood(expectedName, expectedImageURL, expectedDescription, expectedPrice, expectedAmountInKg, expectedDogAgeSpecific, expectedDogSizeSpecific);

            expect(validatorDogSizeCategory).to.have.been.calledWith(expectedDogSizeSpecific, CONSTANTS.DOG_AVAILABLE_SIZE);
        });
    });

    describe('Breed tests', () => {
        let validatorEmptyStringStub;
        let validatorInRangeStub;
        let validatorIsTypeNumberStub;
        let validatorInvalidSymbolsStub;

        beforeEach(() => {
            validatorEmptyStringStub = sinon.stub(VALIDATOR, 'isNonEmptyString');
            validatorInRangeStub = sinon.stub(VALIDATOR, 'isInRange');
            validatorIsTypeNumberStub = sinon.stub(VALIDATOR, 'isOfTypeNumber');
            validatorInvalidSymbolsStub = sinon.stub(VALIDATOR, 'hasInvalidSymbols');
        });

        afterEach(() => {
            validatorEmptyStringStub.restore();
            validatorInRangeStub.restore();
            validatorIsTypeNumberStub.restore();
            validatorInvalidSymbolsStub.restore();
        });

        it('Expect breed object to be constructed with correct properties when constructor is invoked', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 2;
            const expectedHealthIssues = 3;
            const expectedIntelligence = 4;

            const sut = new Breed(expectedName, expectedImageURL, expectedDescription, expectedChildFriendly, expectedGrooming, expectedHealthIssues, expectedIntelligence);

            expect(sut.name).to.equal(expectedName);
            expect(sut.imageURL).to.equal(expectedImageURL);
            expect(sut.description).to.equal(expectedDescription);
            expect(sut.childFriendly).to.equal(expectedChildFriendly);
            expect(sut.grooming).to.equal(expectedGrooming);
            expect(sut.healthIssues).to.equal(expectedHealthIssues);
            expect(sut.intelligence).to.equal(expectedIntelligence);
        });

        it('Expect empty string, string length and invalid symbols validation to be performed for name parameter when breed is constructed', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 2;
            const expectedHealthIssues = 3;
            const expectedIntelligence = 4;

            const sut = new Breed(expectedName, expectedImageURL, expectedDescription, expectedChildFriendly, expectedGrooming, expectedHealthIssues, expectedIntelligence);

            expect(validatorEmptyStringStub).to.have.been.calledWith(expectedName);
            expect(validatorInRangeStub).to.have.been.calledWith(expectedName.length, CONSTANTS.BREED_NAME_MIN_LENGTH, CONSTANTS.BREED_NAME_MAX_LENGTH);
            expect(validatorInvalidSymbolsStub).to.have.been.calledWith(expectedName);
        });

        it('Expect empty string validation to be performed for image url parameter when breed is constructed', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 2;
            const expectedHealthIssues = 3;
            const expectedIntelligence = 4;

            const sut = new Breed(expectedName, expectedImageURL, expectedDescription, expectedChildFriendly, expectedGrooming, expectedHealthIssues, expectedIntelligence);

            expect(validatorEmptyStringStub).to.have.been.calledWith(expectedImageURL);
        });

        it('Expect empty string and string length  validation to be performed for description parameter when breed is constructed', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 2;
            const expectedHealthIssues = 3;
            const expectedIntelligence = 4;

            const sut = new Breed(expectedName, expectedImageURL, expectedDescription, expectedChildFriendly, expectedGrooming, expectedHealthIssues, expectedIntelligence);

            expect(validatorEmptyStringStub).to.have.been.calledWith(expectedDescription);
            expect(validatorInRangeStub).to.have.been.calledWith(expectedDescription.length, CONSTANTS.DESCRIPTION_MIN_LENGTH, CONSTANTS.DESCRIPTION_MAX_LENGTH);
        });

        it('Expect type number and correct range validation to be performed for child friendliness parameter when breed is constructed', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 2;
            const expectedHealthIssues = 3;
            const expectedIntelligence = 4;

            const sut = new Breed(expectedName, expectedImageURL, expectedDescription, expectedChildFriendly, expectedGrooming, expectedHealthIssues, expectedIntelligence);

            expect(validatorIsTypeNumberStub).to.have.been.calledWith(expectedChildFriendly);
            expect(validatorInRangeStub).to.have.been.calledWith(expectedChildFriendly, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        });

        it('Expect type number and correct range validation to be performed for grooming parameter when breed is constructed', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 2;
            const expectedHealthIssues = 3;
            const expectedIntelligence = 4;

            const sut = new Breed(expectedName, expectedImageURL, expectedDescription, expectedChildFriendly, expectedGrooming, expectedHealthIssues, expectedIntelligence);

            expect(validatorIsTypeNumberStub).to.have.been.calledWith(expectedGrooming);
            expect(validatorInRangeStub).to.have.been.calledWith(expectedGrooming, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        });

        it('Expect type number and correct range validation to be performed for health issues parameter when breed is constructed', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 2;
            const expectedHealthIssues = 3;
            const expectedIntelligence = 4;

            const sut = new Breed(expectedName, expectedImageURL, expectedDescription, expectedChildFriendly, expectedGrooming, expectedHealthIssues, expectedIntelligence);

            expect(validatorIsTypeNumberStub).to.have.been.calledWith(expectedHealthIssues);
            expect(validatorInRangeStub).to.have.been.calledWith(expectedHealthIssues, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        });

        it('Expect type number and correct range validation to be performed for intelligence parameter when breed is constructed', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 2;
            const expectedHealthIssues = 3;
            const expectedIntelligence = 4;

            const sut = new Breed(expectedName, expectedImageURL, expectedDescription, expectedChildFriendly, expectedGrooming, expectedHealthIssues, expectedIntelligence);

            expect(validatorIsTypeNumberStub).to.have.been.calledWith(expectedIntelligence);
            expect(validatorInRangeStub).to.have.been.calledWith(expectedIntelligence, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        });
    });

    describe('Cat breed tests', () => {
        let validatorInRangeStub;
        let validatorIsTypeNumberStub;

        beforeEach(() => {
            validatorInRangeStub = sinon.stub(VALIDATOR, 'isInRange');
            validatorIsTypeNumberStub = sinon.stub(VALIDATOR, 'isOfTypeNumber');
        });

        afterEach(() => {
            validatorInRangeStub.restore();
            validatorIsTypeNumberStub.restore();
        });

        it('Expect cat breed object to be constructed with correct properties when constructor is invoked', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 1;
            const expectedHealthIssues = 1;
            const expectedIntelligence = 1;
            const expectedEnergyLevel = 5;
            const expectedAdaptability = 4;
            const expectedSheddingLevel = 3;

            const sut = new CatBreed(
                expectedName,
                expectedImageURL,
                expectedDescription,
                expectedChildFriendly,
                expectedGrooming,
                expectedHealthIssues,
                expectedIntelligence,
                expectedEnergyLevel,
                expectedAdaptability,
                expectedSheddingLevel);

            expect(sut.name).to.equal(expectedName);
            expect(sut.imageURL).to.equal(expectedImageURL);
            expect(sut.description).to.equal(expectedDescription);
            expect(sut.childFriendly).to.equal(expectedChildFriendly);
            expect(sut.grooming).to.equal(expectedGrooming);
            expect(sut.healthIssues).to.equal(expectedHealthIssues);
            expect(sut.intelligence).to.equal(expectedIntelligence);
            expect(sut.energyLevel).to.equal(expectedEnergyLevel);
            expect(sut.adaptability).to.equal(expectedAdaptability);
        });

        it('Expect type number and correct range validation to be performed for energy parameter when cat breed is constructed', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 1;
            const expectedHealthIssues = 1;
            const expectedIntelligence = 1;
            const expectedEnergyLevel = 5;
            const expectedAdaptability = 4;
            const expectedSheddingLevel = 3;

            const sut = new CatBreed(
                expectedName,
                expectedImageURL,
                expectedDescription,
                expectedChildFriendly,
                expectedGrooming,
                expectedHealthIssues,
                expectedIntelligence,
                expectedEnergyLevel,
                expectedAdaptability,
                expectedSheddingLevel);

            expect(validatorIsTypeNumberStub).to.have.been.calledWith(expectedEnergyLevel);
            expect(validatorInRangeStub).to.have.been.calledWith(expectedEnergyLevel, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        });

        it('Expect type number and correct range validation to be performed for adaptability parameter when cat breed is constructed', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 1;
            const expectedHealthIssues = 1;
            const expectedIntelligence = 1;
            const expectedEnergyLevel = 5;
            const expectedAdaptability = 4;
            const expectedSheddingLevel = 3;

            const sut = new CatBreed(
                expectedName,
                expectedImageURL,
                expectedDescription,
                expectedChildFriendly,
                expectedGrooming,
                expectedHealthIssues,
                expectedIntelligence,
                expectedEnergyLevel,
                expectedAdaptability,
                expectedSheddingLevel);

            expect(validatorIsTypeNumberStub).to.have.been.calledWith(expectedAdaptability);
            expect(validatorInRangeStub).to.have.been.calledWith(expectedAdaptability, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        });

        it('Expect type number and correct range validation to be performed for shedding level parameter when cat breed is constructed', () => {
            const expectedName = 'Breed name';
            const expectedImageURL = 'poroda.jpg';
            const expectedDescription = 'valid description';
            const expectedChildFriendly = 1;
            const expectedGrooming = 1;
            const expectedHealthIssues = 1;
            const expectedIntelligence = 1;
            const expectedEnergyLevel = 5;
            const expectedAdaptability = 4;
            const expectedSheddingLevel = 3;

            const sut = new CatBreed(
                expectedName,
                expectedImageURL,
                expectedDescription,
                expectedChildFriendly,
                expectedGrooming,
                expectedHealthIssues,
                expectedIntelligence,
                expectedEnergyLevel,
                expectedAdaptability,
                expectedSheddingLevel);

            expect(validatorIsTypeNumberStub).to.have.been.calledWith(expectedSheddingLevel);
            expect(validatorInRangeStub).to.have.been.calledWith(expectedSheddingLevel, CONSTANTS.BREED_FEATURE_MIN_LEVEL, CONSTANTS.BREED_FEATURE_MAX_LEVEL);
        });
    });
});