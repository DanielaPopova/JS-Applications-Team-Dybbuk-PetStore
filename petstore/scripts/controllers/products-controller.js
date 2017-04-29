import handlebars from 'handlebars';
import { getCatFood } from 'db';
import { getTemplate } from 'templates';

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

            // var template = handlebars.compile('./templates/cat-food.handlebars');
            $('#main-content-container').html(template(catFoodList));
        })
    }
}

const productsController = new ProductsController();

export { productsController };