import handlebars from 'handlebars';
import { getCatFood } from 'db';
import { getTemplate } from 'templates';
import { CONSTANTS } from 'constants';
import { filterStringToFilterObject } from 'filter-string-to-filter-object';
import { filterObjectToFilterString } from 'filter-string-to-filter-object';

class ProductsController {
    loadCatFood(filterString) {
        let filter = {};
        let showEverything;

        if (typeof filterString == 'string') {
            filter = filterStringToFilterObject(filterString);
            showEverything = false;
        } else {
            showEverything = true;
        }

        let requestCatFoodData = getCatFood();
        let requestCatFoodTemplate = getTemplate('cat-food');

        Promise.all([requestCatFoodData, requestCatFoodTemplate]).then(([catFoodList, template]) => {
            const catAges = [];
            CONSTANTS.CAT_AGE_CATEGORIES.forEach(catAgeString => {
                // if filter is not present include every element. That's what Array.isArray is for.
                const isInFilter = showEverything || Array.isArray(filter.catAgeSpecific) && filter.catAgeSpecific.indexOf(catAgeString) >= 0;

                const newCatAge = {
                    ageString: catAgeString,
                    isSelected: isInFilter
                };

                catAges.push(newCatAge);
            });

            const catFoodAvailableAmounts = [];
            CONSTANTS.CAT_FOOD_AVAILABLE_AMOUNTS.forEach(amountInKg => {
                // if filter is not present include every element. That's what Array.isArray is for.
                const isInFilter = showEverything || Array.isArray(filter.amountInKg) && filter.amountInKg.indexOf('' + amountInKg) >= 0;
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
}

const productsController = new ProductsController();

export { productsController };