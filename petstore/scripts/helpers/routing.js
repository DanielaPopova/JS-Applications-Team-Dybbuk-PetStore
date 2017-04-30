import { productsController } from 'products-controller';
import { homeController } from 'home-controller';
import { userController } from 'user-controller';

let router = (() => {
    let router;

    function init() {
        router = new Navigo(null, true);

        router.on('/dogsBreed', () => {
            // TODO: change href attributes in a tags to existing routs  example href"#/home"
            //Promise.all(([data, template]), tl.get('allDogFood'))
            // 1 get data()
            // 2 .then(load content)

            console.log('e vi go');

        });

        router.on('/home', (template) => {
            homeController.loadHome();
        });

        router.on('/cat-food-list/:filter', (params, query) => {
            productsController.loadCatFood(params.filter);
        });


        router.on('/cat-food-list', () => {
            productsController.loadCatFood();
        });

        router.on('/cat-food-details/:catfoodid', (params, query) => {
            productsController.loadCatFoodDetails(params.catfoodid);
        });

        router.on('/dog-food-list', () => {
            productsController.loadDogFood();
        });

        router.on('/login', () => {
            console.log('login');
            userController.renderLoginForm();
            userController.initApp();
        });

        // router.notFound(() => {
        //     router.navigate('/home');
        // });

        router.resolve();
    }

    return {
        init
    }
})();

export { router }