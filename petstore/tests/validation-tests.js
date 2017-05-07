import { VALIDATOR } from 'validator';
import { CONSTANTS } from 'constants';

describe('Validation tests', () => {
    describe('String validation tests', () => {
        it('isNonEmptyString should not throw when non empty string is provided', () => {
            expect(() => VALIDATOR.isNonEmptyString('valid non empty string')).to.not.throw();
        });

        it('isNonEmptyString should throw when non string is provided', () => {
            expect(() => VALIDATOR.isNonEmptyString(666)).to.throw();
        });

        it('isNonEmptyString should throw when string containing spaces is provided', () => {
            expect(() => VALIDATOR.isNonEmptyString('  ')).to.throw();
        });

        it('hasInvalidSymbols should not throw when only latin characters characters are provided', () => {
            const allLatinCharacters = 'the quick brown fox jumps over the lazy dog THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG';

            expect(() => VALIDATOR.hasInvalidSymbols(allLatinCharacters)).to.not.throw();
        });

        it('hasInvalidSymbols should throw when cyrilic characters are provided', () => {
            const allLatinCharacters = 'Чичковите червенотиквеничковчета';

            expect(() => VALIDATOR.hasInvalidSymbols(allLatinCharacters)).to.throw();
        });

        it('hasInvalidSymbols should throw when numeric characters are provided', () => {
            const numericCharacters = 'The earth has 7 billion people';

            expect(() => VALIDATOR.hasInvalidSymbols(numericCharacters)).to.throw();
        });
    });

    describe('Number validation tests', () => {
        it('isOfTypeNumber should not throw when number is provided', () => {
            expect(() => VALIDATOR.isOfTypeNumber(5)).to.not.throw();
        });

        it('isOfTypeNumber should throw when string is provided', () => {
            expect(() => VALIDATOR.isOfTypeNumber('5')).to.throw();
        });

        it('isNegativeNumber should not throw when non negative number is provided', () => {
            expect(() => VALIDATOR.isNegativeNumber(0)).to.not.throw();
            expect(() => VALIDATOR.isNegativeNumber(1)).to.not.throw();
        });

        it('isNegativeNumber should throw when negative number is provided', () => {
            expect(() => VALIDATOR.isNegativeNumber(-5)).to.throw();
        });

        it('isInRange should not throw when number in its range is provided', () => {
            expect(() => VALIDATOR.isInRange(5, 2, 6)).to.not.throw();
        });

        it('isInRange should throw when number less then the minimum is provided', () => {
            expect(() => VALIDATOR.isInRange(1, 2, 6)).to.throw();
        });

        it('isInRange should throw when number more then the maximum is provided', () => {
            expect(() => VALIDATOR.isInRange(7, 2, 6)).to.throw();
        });
    });

    describe('Pet age category', () => {
        it('checkPetAgeCategory should not throw when pet age is in the supplied array', () => {
            expect(() => VALIDATOR.checkPetAgeCategory('puppy', ['adult', 'puppy', 'seniour'])).to.not.throw();
        });

        it('checkPetAgeCategory should throw when pet age is outside the supplied array', () => {
            expect(() => VALIDATOR.checkPetAgeCategory('starokuche', ['adult', 'puppy', 'seniour'])).to.throw();
        });
    });

    describe('Dog size category', () => {
        it('checkDogSizeCategory should not throw when dog size is in the supplied array', () => {
            expect(() => VALIDATOR.checkDogSizeCategory('medium', ['small', 'medium', 'large'])).to.not.throw();
        });

        it('checkDogSizeCategory should throw when dog size is outside the supplied array', () => {
            expect(() => VALIDATOR.checkDogSizeCategory('verylarge', ['small', 'medium', 'large'])).to.throw();
        });
    });
});