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
            }]
            snapshotValStub.returns(dogFoodInDatabase);

            databaseOnceStub.returns(Promise.resolve(snapshotObject))

            const result = sut.getDogFood();

            result.then(dogFoodList => {
                expect(dogFoodList.length).to.equal(dogFoodInDatabase.length);
                dogFoodInDatabase.forEach((dogFoodItem, index) => {
                    expect(dogFoodItem.amountInKg).to.equal(dogFoodInDatabase[index].amountInKg);
                    expect(dogFoodItem.description).to.equal(dogFoodInDatabase[index].description);
                    expect(dogFoodItem.dogAgeSpecific).to.equal(dogFoodInDatabase[index].dogAgeSpecific);
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
                expect(dogFoodItem.imageURL).to.equal(dogFoodObjectInDatabase.imageURL);
                expect(dogFoodItem.name).to.equal(dogFoodObjectInDatabase.name);
                expect(dogFoodItem.price).to.equal(dogFoodObjectInDatabase.price);
            }).then(done, done);
        });
    });
});