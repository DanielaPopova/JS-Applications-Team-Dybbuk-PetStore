import handlebars from 'handlebars';
import { database } from 'db';
import { getTemplate } from 'templates';
import { CONSTANTS } from 'constants';
import { filterStringToFilterObject } from 'filter-string-to-filter-object';
import { filterObjectToFilterString } from 'filter-string-to-filter-object';
import { cartManipulator } from 'cart-manipulator';

class ProductsController {

    loadCatFood(filterString) {
        let filter = {};

        if (typeof filterString == 'string') {
            filter = filterStringToFilterObject(filterString);
        }

        let requestCatFoodData = database.getCatFood(filter);
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

            if (templateObject.catFoodList.length === 0) {
                let $container = $("#items-container");
                let $messageBox = $("<div>");
                $messageBox.attr("id", "msg-box");
                $messageBox.html("No results.");
                $container.append($messageBox);
            }

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

                cartManipulator.addToCart(catFoodList[indexInCatFoodList]);
            });
        });
    }

    loadCatFoodDetails(catFoodId) {
        let requestCatFoodDetails = database.getCatFoodDetails(catFoodId);
        let requestCatFoodTemplate = getTemplate('cat-food-details');

        Promise.all([requestCatFoodDetails, requestCatFoodTemplate]).then(([catFoodDetails, catFoodTemplate]) => {
            if (!catFoodDetails) {
                // if not found return to the cat food list
                window.location.href = "/#/cat-food-list/";
            }

            $('#main-content-container').html(catFoodTemplate(catFoodDetails));

            $('#add-to-cart-button').click(() => {
                cartManipulator.addToCart(catFoodDetails);
            })
        });
    }

    loadDogFood(filterString) {
        let filter = {};

        if (typeof filterString == 'string') {
            filter = filterStringToFilterObject(filterString);
        }

        let requestDogFoodData = database.getDogFood(filter);
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
            CONSTANTS.DOG_AVAILABLE_SIZE.forEach(dogSizeSpecific => {
                const isInFilter = !Array.isArray(filter.dogSizeSpecific) || filter.dogSizeSpecific.indexOf('' + dogSizeSpecific) >= 0;
                const newDogSize = {
                    dogSizeSpecific,
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

            if (templateObject.dogFoodList.length === 0) {
                let $container = $("#items-container");
                let $messageBox = $("<div>");
                $messageBox.attr("id", "msg-box");
                $messageBox.html("No results.");
                $container.append($messageBox);
            }

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

                cartManipulator.addToCart(dogFoodList[indexInDogFoodList]);
            });
        });
    }

    loadDogFoodDetails(dogFoodId) {
        let requestDogFoodDetails = database.getDogFoodDetails(dogFoodId);
        let requestDogFoodTemplate = getTemplate('dog-food-details');

        Promise.all([requestDogFoodDetails, requestDogFoodTemplate]).then(([dogFoodDetails, dogFoodTemplate]) => {
            if (!dogFoodDetails) {
                window.location.href = "/#/dog-food-list/";
            }

            $('#main-content-container').html(dogFoodTemplate(dogFoodDetails));

            $('#add-to-cart-button').click(() => {
                cartManipulator.addToCart(dogFoodDetails);
            })
        });
    }

    loadDogAccessories() {
        let requestDogAccessories = database.getAllDogAccessories();
        let requestDogAccessoriesTemplate = getTemplate('accessories');

        Promise.all([requestDogAccessories, requestDogAccessoriesTemplate]).then(([dogAccessories, dogAccessoriesTemplate]) => {

            if (!dogAccessories) {
                window.location.href = "/#/dog-items-list/";
            }

            $('#main-content-container').html(dogAccessoriesTemplate(dogAccessories));

            $('.add-to-cart-button').click(function() {
                const indexInDogAccessories = $(this).val();

                cartManipulator.addToCart(dogAccessories[indexInDogAccessories]);
            });
        });
    }

    loadDogAccessoryDetails(dogAccessoryId) {
        let requestDogAccessoryDetails = database.getDogAccessoryDetails(dogAccessoryId);
        let requestDogAccessoryTemplate = getTemplate('accessory-details');

        Promise.all([requestDogAccessoryDetails, requestDogAccessoryTemplate]).then(([accessoryDetails, accessoryTemplate]) => {
            if (!accessoryDetails) {
                window.location.href = "/#/dog-items-list/";
            }

            $('#main-content-container').html(accessoryTemplate(accessoryDetails));

            $('#add-to-cart-button').click(() => {
                cartManipulator.addToCart(accessoryDetails);
            })
        });
    }

    loadCatAccessories() {
        let requestCatAccessories = database.getAllCatAccessories();
        let requestCatAccessoriesTemplate = getTemplate('accessories');

        Promise.all([requestCatAccessories, requestCatAccessoriesTemplate]).then(([catAccessories, catAccessoriesTemplate]) => {
            if (!catAccessories) {
                window.location.href = "/#/cat-items-list/";
            }

            $('#main-content-container').html(catAccessoriesTemplate(catAccessories));

            $('.add-to-cart-button').click(function() {
                const indexInCatAccessories = $(this).val();

                cartManipulator.addToCart(catAccessories[indexInCatAccessories]);
            });
        });
    }

    loadCatAccessoryDetails(catAccessoryId) {
        let requestCatAccessoryDetails = database.getCatAccessoryDetails(catAccessoryId);
        let requestCatAccessoryTemplate = getTemplate('accessory-details');

        Promise.all([requestCatAccessoryDetails, requestCatAccessoryTemplate]).then(([accessoryDetails, accessoryTemplate]) => {
            if (!accessoryDetails) {
                window.location.href = "/#/cat-items-list/";
            }

            $('#main-content-container').html(accessoryTemplate(accessoryDetails));

            $('#add-to-cart-button').click(() => {
                cartManipulator.addToCart(accessoryDetails);
            })
        });
    }
}

const productsController = new ProductsController();

export { productsController };