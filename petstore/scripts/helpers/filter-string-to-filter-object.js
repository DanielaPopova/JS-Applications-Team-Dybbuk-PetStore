// Converts string in the format catAgeSpecific=kitten,adult;amountInKg=0.25,1.5 to
// {catAgeSpecific: ['kitten', 'adult'], amountInKg: ['0.25', '1.5']}
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

export function filterObjectToFilterString(filterObject) {
    let filterString = '';

    let isFirstFilterCategory = true;
    for (let key in filterObject) {
        if (isFirstFilterCategory) {
            isFirstFilterCategory = false;
        } else {
            filterString += ';';
        }

        filterString += key + '=';
        let isFirst = true;
        for (let value of filterObject[key]) {
            if (isFirst) {
                isFirst = false;
            } else {
                filterString += ',';
            }

            filterString += value;
        }
    }

    return filterString;
}