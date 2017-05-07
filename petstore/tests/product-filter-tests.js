import { filterStringToFilterObject } from 'filter-string-to-filter-object';
import { filterObjectToFilterString } from 'filter-string-to-filter-object';

describe('Product filter tests', () => {
    describe('Product filter to string transformations tests', () => {
        it('filterStringToFilterObject should construct object from filter string correctly', () => {
            const filterString = 'catAgeSpecific=kitten,adult;amountInKg=0.25,1.5';
            const expectedResult = {
                catAgeSpecific: ['kitten', 'adult'],
                amountInKg: ['0.25', '1.5']
            };

            const result = filterStringToFilterObject(filterString);

            expect(result).to.deep.equal(expectedResult);
        });

        it('filterObjectToFilterString should convert filter object to the correct string', () => {
            const filterObject = {
                catAgeSpecific: ['kitten', 'adult'],
                amountInKg: ['0.25', '1.5']
            };
            const expectedFilterString = 'catAgeSpecific=kitten,adult;amountInKg=0.25,1.5';

            const result = filterObjectToFilterString(filterObject);

            expect(result).to.equal(expectedFilterString);
        });
    });
});