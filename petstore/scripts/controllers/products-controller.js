import handlebars from 'handlebars';
import { getCatFood } from 'db';
import { getCatFoodDetails } from 'db';
import { getAllDogFood } from 'db';
import { getTemplate } from 'templates';
import { CONSTANTS } from 'constants';
import { filterStringToFilterObject } from 'filter-string-to-filter-object';
import { filterObjectToFilterString } from 'filter-string-to-filter-object';
import { addToCart } from 'cart-manipulator';

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

            $('.add-to-cart-button').click(function() {
                const indexInCatFoodList = $(this).val();

                addToCart(catFoodList[indexInCatFoodList]);
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

            $('#add-to-cart-button').click(() => {
                addToCart(catFoodDetails);
            })
        });
    }

    loadDogFood(filterString) {
         let filter = {};

        if (typeof filterString == 'string') {
            filter = filterStringToFilterObject(filterString);
        }

        let requestDogFoodData = getDogFood(filter);
        let requestDogFoodTemplate = getTemplate('dog-food');

        Promise.all([requestDogFoodData, requestDogFoodTemplate]).then(([dogFoodList, template]) => {
            
            const dogAges = [];
            CONSTANTS.DOG_AGE_CATEGORIES.forEach(dogAgeString => {
                // if filter is not present include every element. That's what Array.isArray is for.
                const isInFilter = !Array.isArray(filter.dogAgeSpecific) || filter.dogAgeSpecific.indexOf(dogAgeString) >= 0;

                const newDogAge = {
                    ageString: dogAgeString,
                    isSelected: isInFilter
                };

                dogAges.push(newDogAge);
            });

            const dogFoodAvailableAmounts = [];
            CONSTANTS.DOG_FOOD_AVAILABLE_AMOUNTS.forEach(amountInKg => {
                // if filter is not present include every element. That's what Array.isArray is for.
                const isInFilter = !Array.isArray(filter.amountInKg) || filter.amountInKg.indexOf('' + amountInKg) >= 0;
                const newDogFoodAmount = {
                    amountInKg,
                    isSelected: isInFilter
                };

                dogFoodAvailableAmounts.push(newDogFoodAmount);
            });
            
            const dogAvailableSize = [];
            CONSTANTS.DOG_AVAILABLE_SIZE.forEach(availableSize => {
                const isInFilter = !Array.isArray(filter.availableSize) || filter.availableSize.indexOf('' + availableSize) >= 0;
                const newDogSize = {
                    availableSize,
                    isSelected: isInFilter
                };

                dogAvailableSize.push(newDogSize);
            });


            const templateObject = {
                dogFoodList,
                dogAges,
                dogFoodAvailableAmounts,
                dogAvailableSize
            }

            $('#main-content-container').html(template(templateObject));

            $('#filter-dog-food-button').click(() => {
                if ($('#show-all-products').is(':checked')) {
                    window.location.href = "/#/dog-food-list";
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

                    window.location.href = "/#/dog-food-list/" + filterString;
                }
            });

            $('.add-to-cart-button').click(function() {
                const indexInDogFoodList = $(this).val();

                addToCart(dogFoodList[indexInDogFoodList]);
            });
        });
    }
}

const productsController = new ProductsController();

export { productsController };