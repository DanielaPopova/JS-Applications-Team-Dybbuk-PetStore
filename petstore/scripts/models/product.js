import { VALIDATOR } from 'validator';
import { CONSTANTS } from 'constants';

class Product {
    constructor(name, imageURL, description, price, productDetailPath) {
        this.name = name;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
        this.productDetailPath = productDetailPath
    }

    get name() {
        return this._name;
    }

    set name(value) {
        VALIDATOR.isNonEmptyString(value);
        this._name = value;
    }

    get imageURL() {
        return this._imageURL;
    }

    set imageURL(value) {
        VALIDATOR.isNonEmptyString(value);
        this._imageURL = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        VALIDATOR.isNonEmptyString(value);
        VALIDATOR.isInRange(value, CONSTANTS.DESCRIPTION_MIN_LENGTH, CONSTANTS.DESCRIPTION_MAX_LENGTH);
        this._description = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isNegativeNumber(value);
        this._price = value;
    }

    get productDetailPath() {
        return this._productDetailPath;
    }

    set productDetailPath(value) {
        this._productDetailPath = value;
    }
}

export { Product };