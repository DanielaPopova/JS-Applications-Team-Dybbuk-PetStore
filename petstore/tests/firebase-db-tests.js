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
        databaseOnceStub.returns(Promise.resolve())
    });

    afterEach(() => {
        firebaseDatabaseStub.restore();
    });

    describe('Product tests', () => {
        it('getDogFood without filter should request dogFood from firebase', () => {
            const sut = database;
            sut.getDogFood();

            expect(databaseRefStub).to.have.been.calledWith('dogFood');
        });
    });
});