import { database } from 'db';

describe('Firebase data layer tests', () => {
    let firebaseDatabaseStub;
    let databaseRefStub;
    let databaseOnceStub;

    beforeEach(() => {
        firebaseDatabaseStub = sinon.stub(firebase, 'database');
        databaseRefStub = sinon.stub();
        databaseOnceStub = sinon.stub();

        firebaseDatabaseStub.returns({ ref: databaseRefStub });
        databaseRefStub.returns({ once: databaseOnceStub });
    });

    afterEach(() => {
        firebaseDatabaseStub.restore();
    });

    describe('Product tests', () => {
        it('getDogFood without filter should request dogFood from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns([]);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            sut.getDogFood();

            expect(databaseRefStub).to.have.been.calledWith('dogFood');
        });

        it('getDogFood with filter should request dogFood from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns([]);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const dogFoodFilter = { amountInKg: [0.5] }

            sut.getDogFood(dogFoodFilter);

            expect(databaseRefStub).to.have.been.calledWith('dogFood');
        });

        it('getDogFood without filter should get all the dog food from database', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            const dogFoodInDatabase = [{
                "amountInKg": 0.2,
                "description": "Description",
                "dogAgeSpecific": "puppy",
                "dogSizeSpecific": "small",
                "imageURL": "./images/dog-food/puppy-small.png",
                "name": "Puppy canned food for small dogs",
                "price": 2.5
            }, {
                "amountInKg": 0.5,
                "description": "Description",
                "dogAgeSpecific": "puppy",
                "dogSizeSpecific": "small",
                "imageURL": "./images/dog-food/puppy-small.png",
                "name": "Puppy canned food for small dogs",
                "price": 4.5
            }];
            snapshotValStub.returns(dogFoodInDatabase);

            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            const result = sut.getDogFood();

            result.then(dogFoodList => {
                expect(dogFoodList.length).to.equal(dogFoodInDatabase.length);
                dogFoodList.forEach((dogFoodItem, index) => {
                    expect(dogFoodItem.amountInKg).to.equal(dogFoodInDatabase[index].amountInKg);
                    expect(dogFoodItem.description).to.equal(dogFoodInDatabase[index].description);
                    expect(dogFoodItem.dogAgeSpecific).to.equal(dogFoodInDatabase[index].dogAgeSpecific);
                    expect(dogFoodItem.dogSizeSpecific).to.equal(dogFoodInDatabase[index].dogSizeSpecific);
                    expect(dogFoodItem.imageURL).to.equal(dogFoodInDatabase[index].imageURL);
                    expect(dogFoodItem.name).to.equal(dogFoodInDatabase[index].name);
                    expect(dogFoodItem.price).to.equal(dogFoodInDatabase[index].price);
                });
            }).then(done, done);
        });

        it('getDogFood with filter should get the dog food from database and provide it filtered', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            const dogFoodInDatabase = [{
                "amountInKg": 0.2,
                "description": "Description",
                "dogAgeSpecific": "puppy",
                "dogSizeSpecific": "small",
                "imageURL": "./images/dog-food/puppy-small.png",
                "name": "Puppy canned food for small dogs",
                "price": 2.5
            }, {
                "amountInKg": 0.5,
                "description": "Description",
                "dogAgeSpecific": "puppy",
                "dogSizeSpecific": "small",
                "imageURL": "./images/dog-food/puppy-small.png",
                "name": "Puppy canned food for small dogs",
                "price": 4.5
            }];
            snapshotValStub.returns(dogFoodInDatabase);

            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            const dogFoodFilter = { amountInKg: [0.5] }
            const result = sut.getDogFood(dogFoodFilter);

            result.then(dogFoodList => {
                expect(dogFoodList.length).to.equal(1);
                expect(dogFoodList[0].amountInKg).to.equal(dogFoodInDatabase[1].amountInKg);
                expect(dogFoodList[0].description).to.equal(dogFoodInDatabase[1].description);
                expect(dogFoodList[0].dogAgeSpecific).to.equal(dogFoodInDatabase[1].dogAgeSpecific);
                expect(dogFoodList[0].dogSizeSpecific).to.equal(dogFoodInDatabase[1].dogSizeSpecific);
                expect(dogFoodList[0].imageURL).to.equal(dogFoodInDatabase[1].imageURL);
                expect(dogFoodList[0].name).to.equal(dogFoodInDatabase[1].name);
                expect(dogFoodList[0].price).to.equal(dogFoodInDatabase[1].price);
            }).then(done, done);
        });

        it('getDogFoodDetails should request dogFood with correct id from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            sut.getDogFoodDetails(expectedId);

            expect(databaseRefStub).to.have.been.calledWith('dogFood/' + expectedId);
        });

        it('getDogFoodDetails should retrieve null when firebase doesnt return any object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            const result = sut.getDogFoodDetails(expectedId);

            result.then((dogFoodItem) => {
                expect(dogFoodItem).to.be.null;
            }).then(done, done);
        });

        it('getDogFoodDetails should retrieve value when firebase returns an object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;
            const dogFoodObjectInDatabase = {
                "amountInKg": 0.2,
                "description": "Description",
                "dogAgeSpecific": "puppy",
                "dogSizeSpecific": "small",
                "imageURL": "./images/dog-food/puppy-small.png",
                "name": "Puppy canned food for small dogs",
                "price": 2.5
            };
            snapshotValStub.returns(dogFoodObjectInDatabase);

            const result = sut.getDogFoodDetails(expectedId);

            result.then((dogFoodItem) => {
                expect(dogFoodItem.amountInKg).to.equal(dogFoodObjectInDatabase.amountInKg);
                expect(dogFoodItem.description).to.equal(dogFoodObjectInDatabase.description);
                expect(dogFoodItem.dogAgeSpecific).to.equal(dogFoodObjectInDatabase.dogAgeSpecific);
                expect(dogFoodItem.dogSizeSpecific).to.equal(dogFoodObjectInDatabase.dogSizeSpecific);
                expect(dogFoodItem.imageURL).to.equal(dogFoodObjectInDatabase.imageURL);
                expect(dogFoodItem.name).to.equal(dogFoodObjectInDatabase.name);
                expect(dogFoodItem.price).to.equal(dogFoodObjectInDatabase.price);
            }).then(done, done);
        });

        it('getCatFood without filter should request catFood from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns([]);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            sut.getCatFood();

            expect(databaseRefStub).to.have.been.calledWith('catFood');
        });

        it('getCatFood with filter should request catFood from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns([]);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const catFoodFilter = { amountInKg: [1.5] }

            sut.getCatFood(catFoodFilter);

            expect(databaseRefStub).to.have.been.calledWith('catFood');
        });

        it('getCatFood without filter should get all the cat food from database', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            const catFoodInDatabase = [{
                "amountInKg": 1.5,
                "catAgeSpecific": "kitten",
                "description": "Description",
                "imageURL": "./images/cat-food/kitten.png",
                "name": "Kitten sprayed/neutered dry cat food",
                "price": 6.0
            }, {
                "amountInKg": 4.0,
                "catAgeSpecific": "kitten",
                "description": "Description",
                "imageURL": "./images/cat-food/kitten.png",
                "name": "Kitten sprayed/neutered dry cat food",
                "price": 10.0
            }];

            snapshotValStub.returns(catFoodInDatabase);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            const result = sut.getCatFood();

            result.then(catFoodList => {
                expect(catFoodList.length).to.equal(catFoodInDatabase.length);
                catFoodList.forEach((catFoodItem, index) => {
                    expect(catFoodItem.amountInKg).to.equal(catFoodInDatabase[index].amountInKg);
                    expect(catFoodItem.catAgeSpecific).to.equal(catFoodInDatabase[index].catAgeSpecific);
                    expect(catFoodItem.description).to.equal(catFoodInDatabase[index].description);
                    expect(catFoodItem.imageURL).to.equal(catFoodInDatabase[index].imageURL);
                    expect(catFoodItem.name).to.equal(catFoodInDatabase[index].name);
                    expect(catFoodItem.price).to.equal(catFoodInDatabase[index].price);
                });
            }).then(done, done);
        });

        it('getCatFood with filter should get the cat food from database and provide it filtered', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            const catFoodInDatabase = [{
                "amountInKg": 1.5,
                "catAgeSpecific": "kitten",
                "description": "Description",
                "imageURL": "./images/cat-food/kitten.png",
                "name": "Kitten sprayed/neutered dry cat food",
                "price": 6.0
            }, {
                "amountInKg": 4.0,
                "catAgeSpecific": "kitten",
                "description": "Description",
                "imageURL": "./images/cat-food/kitten.png",
                "name": "Kitten sprayed/neutered dry cat food",
                "price": 10.0
            }];

            snapshotValStub.returns(catFoodInDatabase);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            const catFoodFilter = { amountInKg: [4.0] }
            const result = sut.getCatFood(catFoodFilter);

            result.then(catFoodList => {
                expect(catFoodList.length).to.equal(1);
                expect(catFoodList[0].amountInKg).to.equal(catFoodInDatabase[1].amountInKg);
                expect(catFoodList[0].description).to.equal(catFoodInDatabase[1].description);
                expect(catFoodList[0].catAgeSpecific).to.equal(catFoodInDatabase[1].catAgeSpecific);
                expect(catFoodList[0].imageURL).to.equal(catFoodInDatabase[1].imageURL);
                expect(catFoodList[0].name).to.equal(catFoodInDatabase[1].name);
                expect(catFoodList[0].price).to.equal(catFoodInDatabase[1].price);
            }).then(done, done);
        });

        it('getCatFoodDetails should request catFood with correct id from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            sut.getCatFoodDetails(expectedId);

            expect(databaseRefStub).to.have.been.calledWith('catFood/' + expectedId);
        });

        it('getCatFoodDetails should retrieve null when firebase doesnt return any object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            const result = sut.getCatFoodDetails(expectedId);

            result.then((catFoodItem) => {
                expect(catFoodItem).to.be.null;
            }).then(done, done);
        });

        it('getCatFoodDetails should retrieve value when firebase returns an object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;
            const catFoodObjectInDatabase = {
                "amountInKg": 1.5,
                "catAgeSpecific": "kitten",
                "description": "Description",
                "imageURL": "./images/cat-food/kitten.png",
                "name": "Kitten sprayed/neutered dry cat food",
                "price": 6.0
            };
            snapshotValStub.returns(catFoodObjectInDatabase);

            const result = sut.getCatFoodDetails(expectedId);

            result.then((catFoodItem) => {
                expect(catFoodItem.amountInKg).to.equal(catFoodObjectInDatabase.amountInKg);
                expect(catFoodItem.catAgeSpecific).to.equal(catFoodObjectInDatabase.catAgeSpecific);
                expect(catFoodItem.description).to.equal(catFoodObjectInDatabase.description);
                expect(catFoodItem.imageURL).to.equal(catFoodObjectInDatabase.imageURL);
                expect(catFoodItem.name).to.equal(catFoodObjectInDatabase.name);
                expect(catFoodItem.price).to.equal(catFoodObjectInDatabase.price);
            }).then(done, done);
        });

        it('getAllDogAccessories should request dogAccessories from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns([]);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            sut.getAllDogAccessories();

            expect(databaseRefStub).to.have.been.calledWith('dogAccessories');
        });

        it('getAllDogAccessories should get all the dog accessories from database', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            const dogAccessoriesInDatabase = [{
                "description": "Description",
                "imageURL": "./images/dog-accessories/dog-bed.png",
                "name": "Do Not Disturb Luxury Oval Bed",
                "price": 70.0
            }, {
                "description": "Description",
                "imageURL": "./images/dog-accessories/dog-collar.png",
                "name": "Vintage Nylon Adjustable Collar",
                "price": 10.0
            }];

            snapshotValStub.returns(dogAccessoriesInDatabase);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            const result = sut.getAllDogAccessories();

            result.then(dogAccessoriesList => {
                expect(dogAccessoriesList.length).to.equal(dogAccessoriesInDatabase.length);
                dogAccessoriesList.forEach((dogAccessoryItem, index) => {
                    expect(dogAccessoryItem.description).to.equal(dogAccessoriesInDatabase[index].description);
                    expect(dogAccessoryItem.imageURL).to.equal(dogAccessoriesInDatabase[index].imageURL);
                    expect(dogAccessoryItem.name).to.equal(dogAccessoriesInDatabase[index].name);
                    expect(dogAccessoryItem.price).to.equal(dogAccessoriesInDatabase[index].price);
                });
            }).then(done, done);
        });

        it('getDogAccessoryDetails should request dogAccessories with correct id from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            sut.getDogAccessoryDetails(expectedId);

            expect(databaseRefStub).to.have.been.calledWith('dogAccessories/' + expectedId);
        });

        it('getDogAccessoryDetails should retrieve null when firebase doesnt return any object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            const result = sut.getDogAccessoryDetails(expectedId);

            result.then((dogAccessoryItem) => {
                expect(dogAccessoryItem).to.be.null;
            }).then(done, done);
        });

        it('getDogAccessoryDetails should retrieve value when firebase returns an object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;
            const dogAccessoryObjectInDatabase = {
                "description": "Description",
                "imageURL": "./images/dog-accessories/dog-bed.png",
                "name": "Do Not Disturb Luxury Oval Bed",
                "price": 70.0
            };

            snapshotValStub.returns(dogAccessoryObjectInDatabase);

            const result = sut.getDogAccessoryDetails(expectedId);

            result.then((dogAccessoryItem) => {
                expect(dogAccessoryItem.description).to.equal(dogAccessoryObjectInDatabase.description);
                expect(dogAccessoryItem.imageURL).to.equal(dogAccessoryObjectInDatabase.imageURL);
                expect(dogAccessoryItem.name).to.equal(dogAccessoryObjectInDatabase.name);
                expect(dogAccessoryItem.price).to.equal(dogAccessoryObjectInDatabase.price);
            }).then(done, done);
        });

        it('getAllCatAccessories should request catAccessories from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns([]);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            sut.getAllCatAccessories();

            expect(databaseRefStub).to.have.been.calledWith('catAccessories');
        });

        it('getAllCatAccessories should get all the cat accessories from database', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            const catAccessoriesInDatabase = [{
                "description": "Description",
                "imageURL": "./images/cat-accessories/cat-cleaner.png",
                "name": "Dybbuk cat cleaner",
                "price": 10.5
            }, {
                "description": "Description",
                "imageURL": "./images/cat-accessories/cat-bowl.png",
                "name": "Dybbuk nice diner 2in1 cat bowl",
                "price": 11.0
            }];

            snapshotValStub.returns(catAccessoriesInDatabase);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            const result = sut.getAllCatAccessories();

            result.then(catAccessoriesList => {
                expect(catAccessoriesList.length).to.equal(catAccessoriesInDatabase.length);
                catAccessoriesList.forEach((catAccessoryItem, index) => {
                    expect(catAccessoryItem.description).to.equal(catAccessoriesInDatabase[index].description);
                    expect(catAccessoryItem.imageURL).to.equal(catAccessoriesInDatabase[index].imageURL);
                    expect(catAccessoryItem.name).to.equal(catAccessoriesInDatabase[index].name);
                    expect(catAccessoryItem.price).to.equal(catAccessoriesInDatabase[index].price);
                });
            }).then(done, done);
        });

        it('getCatAccessoryDetails should request catAccessories with correct id from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            sut.getCatAccessoryDetails(expectedId);

            expect(databaseRefStub).to.have.been.calledWith('catAccessories/' + expectedId);
        });

        it('getCatAccessoryDetails should retrieve null when firebase doesnt return any object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            const result = sut.getCatAccessoryDetails(expectedId);

            result.then((catAccessoryItem) => {
                expect(catAccessoryItem).to.be.null;
            }).then(done, done);
        });

        it('getCatAccessoryDetails should retrieve value when firebase returns an object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;
            const catAccessoryObjectInDatabase = {
                "description": "Description",
                "imageURL": "./images/cat-accessories/cat-cleaner.png",
                "name": "Dybbuk cat cleaner",
                "price": 10.5
            };

            snapshotValStub.returns(catAccessoryObjectInDatabase);

            const result = sut.getDogAccessoryDetails(expectedId);

            result.then((catAccessoryItem) => {
                expect(catAccessoryItem.description).to.equal(catAccessoryObjectInDatabase.description);
                expect(catAccessoryItem.imageURL).to.equal(catAccessoryObjectInDatabase.imageURL);
                expect(catAccessoryItem.name).to.equal(catAccessoryObjectInDatabase.name);
                expect(catAccessoryItem.price).to.equal(catAccessoryObjectInDatabase.price);
            }).then(done, done);
        });
    });

    describe('Pet breed tests', () => {
        it('getAllDogBreeds should request dogBreeds from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns([]);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            sut.getAllDogBreeds();

            expect(databaseRefStub).to.have.been.calledWith('dogBreeds');
        });

        it('getAllDogBreeds should get all the dog breeds from database', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            const dogBreedsInDatabase = [{
                "appFriendly": 5,
                "childFriendly": 3,
                "description": "Description",
                "exerciseNeeds": 4,
                "grooming": 5,
                "healthIssues": 3,
                "imageURL": "./images/dogs/akita.jpg",
                "intelligence": 5,
                "name": "Akita",
                "size": "large",
                "trainability": 3
            }, {
                "appFriendly": 2,
                "childFriendly": 5,
                "description": "Description",
                "exerciseNeeds": 5,
                "grooming": 1,
                "healthIssues": 3,
                "imageURL": "./images/dogs/beagle.jpg",
                "intelligence": 4,
                "name": "Beagle",
                "size": "medium",
                "trainability": 1
            }];

            snapshotValStub.returns(dogBreedsInDatabase);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            const result = sut.getAllDogBreeds();

            result.then(dogBreedsList => {
                expect(dogBreedsList.length).to.equal(dogBreedsInDatabase.length);
                dogBreedsList.forEach((dogBreed, index) => {
                    expect(dogBreed.appFriendly).to.equal(dogBreedsInDatabase[index].appFriendly);
                    expect(dogBreed.childFriendly).to.equal(dogBreedsInDatabase[index].childFriendly);
                    expect(dogBreed.description).to.equal(dogBreedsInDatabase[index].description);
                    expect(dogBreed.exerciseNeeds).to.equal(dogBreedsInDatabase[index].exerciseNeeds);
                    expect(dogBreed.grooming).to.equal(dogBreedsInDatabase[index].grooming);
                    expect(dogBreed.healthIssues).to.equal(dogBreedsInDatabase[index].healthIssues);
                    expect(dogBreed.imageURL).to.equal(dogBreedsInDatabase[index].imageURL);
                    expect(dogBreed.intelligence).to.equal(dogBreedsInDatabase[index].intelligence);
                    expect(dogBreed.name).to.equal(dogBreedsInDatabase[index].name);
                    expect(dogBreed.size).to.equal(dogBreedsInDatabase[index].size);
                    expect(dogBreed.trainability).to.equal(dogBreedsInDatabase[index].trainability);
                });
            }).then(done, done);
        });

        it('getDogBreedDetails should request dogBreeds with correct id from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            sut.getDogBreedDetails(expectedId);

            expect(databaseRefStub).to.have.been.calledWith('dogBreeds/' + expectedId);
        });

        it('getDogBreedDetails should retrieve null when firebase doesnt return any object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            const result = sut.getDogBreedDetails(expectedId);

            result.then((dogBreed) => {
                expect(dogBreed).to.be.null;
            }).then(done, done);
        });

        it('getDogBreedDetails should retrieve value when firebase returns an object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;
            const dogBreedObjectInDatabase = {
                "appFriendly": 5,
                "childFriendly": 3,
                "description": "Description",
                "exerciseNeeds": 4,
                "grooming": 5,
                "healthIssues": 3,
                "imageURL": "./images/dogs/akita.jpg",
                "intelligence": 5,
                "name": "Akita",
                "size": "large",
                "trainability": 3
            };

            snapshotValStub.returns(dogBreedObjectInDatabase);

            const result = sut.getDogBreedDetails(expectedId);

            result.then((dogBreed) => {
                expect(dogBreed.appFriendly).to.equal(dogBreedObjectInDatabase.appFriendly);
                expect(dogBreed.childFriendly).to.equal(dogBreedObjectInDatabase.childFriendly);
                expect(dogBreed.description).to.equal(dogBreedObjectInDatabase.description);
                expect(dogBreed.exerciseNeeds).to.equal(dogBreedObjectInDatabase.exerciseNeeds);
                expect(dogBreed.grooming).to.equal(dogBreedObjectInDatabase.grooming);
                expect(dogBreed.healthIssues).to.equal(dogBreedObjectInDatabase.healthIssues);
                expect(dogBreed.imageURL).to.equal(dogBreedObjectInDatabase.imageURL);
                expect(dogBreed.intelligence).to.equal(dogBreedObjectInDatabase.intelligence);
                expect(dogBreed.name).to.equal(dogBreedObjectInDatabase.name);
                expect(dogBreed.size).to.equal(dogBreedObjectInDatabase.size);
                expect(dogBreed.trainability).to.equal(dogBreedObjectInDatabase.trainability);
            }).then(done, done);
        });

        it('getAllCatBreeds should request catBreeds from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns([]);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            sut.getAllCatBreeds();

            expect(databaseRefStub).to.have.been.calledWith('catBreeds');
        });

        it('getAllCatBreeds should get all the cat breeds from database', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            const catBreedsInDatabase = [{
                "adaptability": 5,
                "childFriendly": 3,
                "description": "Description",
                "energyLevel": 5,
                "grooming": 1,
                "healthIssues": 2,
                "imageURL": "./images/cats/abyssinian.jpg",
                "intelligence": 5,
                "name": "Abyssinian",
                "sheddingLevel": 2
            }, {
                "adaptability": 5,
                "childFriendly": 4,
                "description": "Description",
                "energyLevel": 3,
                "grooming": 3,
                "healthIssues": 1,
                "imageURL": "./images/cats/bobtail.jpg",
                "intelligence": 5,
                "name": "American Bobtail",
                "sheddingLevel": 3
            }];

            snapshotValStub.returns(catBreedsInDatabase);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            const result = sut.getAllCatBreeds();

            result.then(catBreedsList => {
                expect(catBreedsList.length).to.equal(catBreedsInDatabase.length);
                catBreedsList.forEach((catBreed, index) => {
                    expect(catBreed.appFriendly).to.equal(catBreedsInDatabase[index].appFriendly);
                    expect(catBreed.childFriendly).to.equal(catBreedsInDatabase[index].childFriendly);
                    expect(catBreed.description).to.equal(catBreedsInDatabase[index].description);
                    expect(catBreed.energyLevel).to.equal(catBreedsInDatabase[index].energyLevel);
                    expect(catBreed.grooming).to.equal(catBreedsInDatabase[index].grooming);
                    expect(catBreed.healthIssues).to.equal(catBreedsInDatabase[index].healthIssues);
                    expect(catBreed.imageURL).to.equal(catBreedsInDatabase[index].imageURL);
                    expect(catBreed.intelligence).to.equal(catBreedsInDatabase[index].intelligence);
                    expect(catBreed.name).to.equal(catBreedsInDatabase[index].name);
                    expect(catBreed.sheddingLevel).to.equal(catBreedsInDatabase[index].sheddingLevel);
                });
            }).then(done, done);
        });

        it('getCatBreedDetails should request catBreeds with correct id from firebase', () => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            sut.getCatBreedDetails(expectedId);

            expect(databaseRefStub).to.have.been.calledWith('catBreeds/' + expectedId);
        });

        it('getCatBreedDetails should retrieve null when firebase doesnt return any object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            snapshotValStub.returns(undefined);
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;

            const result = sut.getCatBreedDetails(expectedId);

            result.then((catBreed) => {
                expect(catBreed).to.be.null;
            }).then(done, done);
        });

        it('getCatBreedDetails should retrieve value when firebase returns an object', (done) => {
            const sut = database;
            const snapshotValStub = sinon.stub();
            const snapshotObject = { val: snapshotValStub };
            databaseOnceStub.returns(Promise.resolve(snapshotObject))
            const expectedId = 5;
            const catBreedObjectInDatabase = {
                "adaptability": 5,
                "childFriendly": 3,
                "description": "Description",
                "energyLevel": 5,
                "grooming": 1,
                "healthIssues": 2,
                "imageURL": "./images/cats/abyssinian.jpg",
                "intelligence": 5,
                "name": "Abyssinian",
                "sheddingLevel": 2
            };

            snapshotValStub.returns(catBreedObjectInDatabase);

            const result = sut.getCatBreedDetails(expectedId);

            result.then((catBreed) => {
                expect(catBreed.appFriendly).to.equal(catBreedObjectInDatabase.appFriendly);
                expect(catBreed.childFriendly).to.equal(catBreedObjectInDatabase.childFriendly);
                expect(catBreed.description).to.equal(catBreedObjectInDatabase.description);
                expect(catBreed.energyLevel).to.equal(catBreedObjectInDatabase.energyLevel);
                expect(catBreed.grooming).to.equal(catBreedObjectInDatabase.grooming);
                expect(catBreed.healthIssues).to.equal(catBreedObjectInDatabase.healthIssues);
                expect(catBreed.imageURL).to.equal(catBreedObjectInDatabase.imageURL);
                expect(catBreed.intelligence).to.equal(catBreedObjectInDatabase.intelligence);
                expect(catBreed.name).to.equal(catBreedObjectInDatabase.name);
                expect(catBreed.sheddingLevel).to.equal(catBreedObjectInDatabase.sheddingLevel);
            }).then(done, done);
        });
    });
});