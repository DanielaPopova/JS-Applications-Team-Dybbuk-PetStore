const { expect } = require('chai');
const { CatFood } = require('../../scripts/models/cat-food')();

describe('Test', function() {
    describe('nested test', function() {
        it('expect to succeed', function() {
            expect(1).to.equal(1);
        });
        it('expect to fail', function() {
            expect(1).to.equal(2);
        });
    });
});