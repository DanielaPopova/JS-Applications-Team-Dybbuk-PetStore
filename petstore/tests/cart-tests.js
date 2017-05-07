import { cartManipulator } from 'cart-manipulator';
import { CatFood } from 'cat-food';
import { CONSTANTS } from 'constants';

describe('Cart tests', () => {
    const clearLocalStorage = () => {
        localStorage.removeItem('productCart');
    };

    beforeEach(clearLocalStorage);
    afterEach(clearLocalStorage);

    describe('Adding to cart tests', () => {

        beforeEach(() => {
            $ = sinon.stub();
        });

        afterEach(() => {

        });

        it('Expect passed product to be added to the localStorage productCart value', () => {
            const validName = "Product name";
            const validImageURL = "product-pic.png";
            const validDescription = "Product description";
            const validPrice = 666.66;
            const validAmountInKg = 1.4;
            const validCatAgeSpecific = CONSTANTS.CAT_AGE_CATEGORIES[0];
            const catFoodProductObject = new CatFood(validName, validImageURL, validDescription, validPrice, validAmountInKg, validCatAgeSpecific);
            const sut = cartManipulator

            sut.addToCart(catFoodProductObject);

            expect(localStorage.productCart).to.contain(validName);
            expect(localStorage.productCart).to.contain(validImageURL);
            expect(localStorage.productCart).to.contain(validDescription);
            expect(localStorage.productCart).to.contain(validPrice);
            expect(localStorage.productCart).to.contain(validAmountInKg);
            expect(localStorage.productCart).to.contain(validCatAgeSpecific);
        });

        it('Expect passed product to be added and retrieved correctly from localStorage', () => {
            const validName = "Product name";
            const validImageURL = "product-pic.png";
            const validDescription = "Product description";
            const validPrice = 666.66;
            const validAmountInKg = 1.4;
            const validCatAgeSpecific = CONSTANTS.CAT_AGE_CATEGORIES[0];
            const validProductDetailPath = "#/cat-food-details/0"
            const catFoodProductObject = new CatFood(validName, validImageURL, validDescription, validPrice, validAmountInKg, validCatAgeSpecific);
            catFoodProductObject.productDetailPath = validProductDetailPath;
            const sut = cartManipulator;
            sut.addToCart(catFoodProductObject);

            const result = sut.getProductsInCart();

            expect(result.length).to.equal(1);
            expect(result[0]).to.include(catFoodProductObject);
        });

        it('Expect remove from cart to remove the only product in cart after it is added', () => {
            const validName = "Product name";
            const validImageURL = "product-pic.png";
            const validDescription = "Product description";
            const validPrice = 666.66;
            const validAmountInKg = 1.4;
            const validCatAgeSpecific = CONSTANTS.CAT_AGE_CATEGORIES[0];
            const validProductDetailPath = "#/cat-food-details/0"
            const catFoodProductObject = new CatFood(validName, validImageURL, validDescription, validPrice, validAmountInKg, validCatAgeSpecific);
            catFoodProductObject.productDetailPath = validProductDetailPath;
            const sut = cartManipulator;
            sut.addToCart(catFoodProductObject);
            const addedProducts = sut.getProductsInCart();

            sut.removeFromCart(addedProducts[0].idInCart);

            expect(sut.getProductsInCart().length).to.equal(0);
        });
    });
});