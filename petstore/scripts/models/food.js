import { VALIDATOR } from 'validator';
import { Product } from 'product';

class Food extends Product{
    constructor(name, imageURL, description, price, amountInKg){
        super(name, imageURL, description, price);
        this.amountInKg = amountInKg;
    }

    get amountInKg(){
        return this._amountInKg;
    }

    set amountInKg(value){
        VALIDATOR.isOfTypeNumber(value);
        VALIDATOR.isNegativeNumber(value);
        this._amountInKg = value;
    }
}

export { Food };