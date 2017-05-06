import { VALIDATOR } from 'validator';
import { CONSTANTS } from 'constants';
import { Product } from 'product';
import { CatFood } from 'cat-food';

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
});