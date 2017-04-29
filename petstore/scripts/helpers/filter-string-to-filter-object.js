// Converts string in the format catAgeSpecific=kitten,adult;amountInKg=0.2,0.5 to
// {catAgeSpecific: ['kitten', 'adult'], amountInKg: ['0.2', '0.5']}
export function filterStringToFilterObject(filterString) {
    if (typeof filterString != 'string') {
        throw new Error('String must be supplied as the only argument');
    }

    const stringCategories = filterString.split(';');

    const filterObject = {};

    stringCategories.forEach(stringCategory => {
        const [filterKey, filterValuesAsString] = stringCategory.split('=');
        filterObject[filterKey] = filterValuesAsString.split(',');
    });

    return filterObject;
}