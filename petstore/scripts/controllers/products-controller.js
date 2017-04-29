import handlebars from 'handlebars';
import { getCatFood } from 'db';
import { getTemplate } from 'templates';
import { CONSTANTS } from 'constants';

class ProductsController {
    loadCatFood(filter) {
        if (typeof filter != 'object') {
            filter = {};
        }

        let requestCatFoodData = getCatFood(filter);
        let requestCatFoodTemplate = getTemplate('cat-food');

        Promise.all([requestCatFoodData, requestCatFoodTemplate]).then(([catFoodList, template]) => {
            console.log(catFoodList, template);
            // console.log(catFoodList);

            const catAges = [];
            CONSTANTS.CAT_AGE_CATEGORIES.forEach(catAgeString => {
                const newCatAge = {
                    ageString: catAgeString,
                    isSelected: true
                }
                catAges.push(newCatAge);
            });

            const catFoodAvailableAmounts = [];
            CONSTANTS.CAT_FOOD_AVAILABLE_AMOUNTS.forEach(amountInKg => {
                const newCatFoodAmount = {
                    amountInKg,
                    isSelected: true
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