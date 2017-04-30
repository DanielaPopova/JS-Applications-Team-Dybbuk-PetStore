import handlebars from 'handlebars';
import { getCatFood } from 'db';
import { getCatFoodDetails } from 'db';
import { getAllDogFood } from 'db';
import { getTemplate } from 'templates';
import { CONSTANTS } from 'constants';
import { filterStringToFilterObject } from 'filter-string-to-filter-object';
import { filterObjectToFilterString } from 'filter-string-to-filter-object';

class ProductsController {
    loadCatFood(filterString) {
        let filter = {};

        if (typeof filterString == 'string') {
            filter = filterStringToFilterObject(filterString);
        }

        let requestCatFoodData = getCatFood(filter);
        let requestCatFoodTemplate = getTemplate('cat-food');

        Promise.all([requestCatFoodData, requestCatFoodTemplate]).then(([catFoodList, template]) => {
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

            $('#filter-cat-food-button').click(() => {
                if ($('#show-all-products').is(':checked')) {
                    window.location.href = "/#/cat-food-list";
                } else {
                    let filterItems = {};
                    $('#filter input[type=checkbox]:checked').each(function() {
                        const filterKey = $(this).attr('name');
                        if (typeof filterItems[filterKey] == 'undefined') {
                            filterItems[filterKey] = [];
                        }
                        filterItems[filterKey].push($(this).val());
                    });

                    const filterString = filterObjectToFilterString(filterItems);

                    window.location.href = "/#/cat-food-list/" + filterString;
                }
            });
        });
    }

    loadCatFoodDetails(catFoodId) {
        let requestCatFoodDetails = getCatFoodDetails(catFoodId);
        let requestCatFoodTemplate = getTemplate('cat-food-details');

        Promise.all([requestCatFoodDetails, requestCatFoodTemplate]).then(([catFoodDetails, catFoodTemplate]) => {
            if (!catFoodDetails) {
                // if not found return to the cat food list
                window.location.href = "/#/cat-food-list/";
            }
            $('#main-content-container').html(catFoodTemplate(catFoodDetails));
        });
    }

    loadDogFood() {

        let requestDogFoodData = getAllDogFood();
        let requestDogFoodTemplate = getTemplate('dog-food');

        Promise.all([requestDogFoodData, requestDogFoodTemplate]).then(([dogFoodList, template]) => {

            console.log(dogFoodList);
            $('#main-content-container').html(template(dogFoodList));
        });
    }
}

const productsController = new ProductsController();

export { productsController };