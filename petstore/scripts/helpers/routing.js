import { productsController } from 'products-controller';
import { homeController } from 'home-controller';
import { userController } from 'user-controller';
import { cartController } from 'cart-controller';
import Navigo from 'navigo';

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

        router.on('/dog-food-list/:filter', (params, query) => {
            productsController.loadDogFood(params.filter);
        });

        router.on('/dog-food-list', () => {
            productsController.loadDogFood();
        });

        router.on('/dog-food-details/:dogfoodid', (params, query) => {
            productsController.loadDogFoodDetails(params.dogfoodid);
        });


        router.on('/dog-items-list', () => {            
            productsController.loadDogAccessories();
        });
        

         router.on('/dog-items-details/:dogaccessoryid', (params, query) => {
            productsController.loadDogAccessoryDetails(params.dogaccessoryid);
        });

        router.on('/cat-items-list', () => {
            productsController.loadCatAccessories();
        });

         router.on('/cat-items-details/:cataccessoryid', (params, query) => {
            productsController.loadCatAccessoryDetails(params.cataccessoryid);
        });
		
		 router.on('/dog-breeds-list', () => {            
            breedController.loadDogBreeds();
        });

        router.on('/cat-breeds-list', () => {
            breedController.loadCatBreeds();
        });

        router.on('/login', () => {            
            userController.renderLoginForm();            
        });

        router.on('/cart', () => {
            cartController.loadCart();
        });

        router.notFound(() => {
            router.navigate('/home');
        });

        router.resolve();
    }

    return {
        init
    }
})();

export { router }