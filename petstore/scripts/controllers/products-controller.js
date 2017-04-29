import handlebars from 'handlebars';
import { getCatFood } from 'db';
import { getTemplate } from 'templates';
import { CONSTANTS } from 'constants';
import { filterStringToFilterObject } from 'filter-string-to-filter-object';

class ProductsController {
    loadCatFood(filterString) {
        let filter = {};
        console.log(filterString);
        if (typeof filterString == 'string') {
            filter = filterStringToFilterObject(filterString);
        }
        console.log(filter);
        let requestCatFoodData = getCatFood();
        let requestCatFoodTemplate = getTemplate('cat-food');

        Promise.all([requestCatFoodData, requestCatFoodTemplate]).then(([catFoodList, template]) => {
            console.log(catFoodList, template);
            // console.log(catFoodList);

            const catAges = [];
            CONSTANTS.CAT_AGE_CATEGORIES.forEach(catAgeString => {
                // if filter is not present include every element. That's what Array.isArray is for.
                const isInFilter = !Array.isArray(filter.catAgeSpecific) || filter.catAgeSpecific.indexOf(catAgeString) >= 0;

                const newCatAge = {
                    ageString: catAgeString,
                    isSelected: isInFilter
                };

                catAges.push(newCatAge);
            });

            const catFoodAvailableAmounts = [];
            CONSTANTS.CAT_FOOD_AVAILABLE_AMOUNTS.forEach(amountInKg => {
                // if filter is not present include every element. That's what Array.isArray is for.
                const isInFilter = !Array.isArray(filter.amountInKg) || filter.amountInKg.indexOf('' + amountInKg) >= 0;
                const newCatFoodAmount = {
                    amountInKg,
                    isSelected: isInFilter
                };

                catFoodAvailableAmounts.push(newCatFoodAmount);
            });

            const templateObject = {
                catFoodList,
                catAges,
                catFoodAvailableAmounts
            }

            $('#main-content-container').html(template(templateObject));
        });
    }
}

const productsController = new ProductsController();

export { productsController };