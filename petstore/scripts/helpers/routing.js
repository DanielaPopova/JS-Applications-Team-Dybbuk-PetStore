import { productsController } from 'products-controller';
import { homeController } from 'home-controller';
import { userController } from 'user-controller';
import { breedController } from 'breed-controller';
import { cartController } from 'cart-controller';
import { bestPetController } from 'best-pet-controller';
import { contactsController } from 'contacts-controller';
import Navigo from 'navigo';

let router = (() => {
    let router;

    function init() {
        router = new Navigo(null, true);

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

        router.on('/dog-breeds-details/:dogbreedid', (params, query) => {
            breedController.loadDogBreedDetails(params.dogbreedid);
        });

        router.on('/cat-breeds-list', () => {
            breedController.loadCatBreeds();
        });

        router.on('/cat-breeds-details/:catbreedid', (params, query) => {
            breedController.loadCatBreedDetails(params.catbreedid);
        });

        router.on('/login', () => {            
            userController.renderLoginForm();           
        });

        router.on('/cart', () => {
            cartController.loadCart();
        });

        router.on('/best-pet', () => {
            bestPetController.loadCatDogChoise();
        });

        router.on('/best-pet/dog', () => {
            bestPetController.loadDogQuiz();
        });

        router.on('/best-pet/dog/intelligent', () => {
            let filter = { intelligence: 4 };
            bestPetController.filterDog(filter);
        });

        router.on('/best-pet/dog/families', () => {
            let filter = { childFriendly: 4 };
            bestPetController.filterDog(filter);
        });

        router.on('/best-pet/dog/appartment', () => {
            let filter = { appFriendly: 4 };
            bestPetController.filterDog(filter);
        });

         router.on('/best-pet/cat/best-cat', () => {
            let filter = { childFriendly: 4 };
            bestPetController.filterCat(filter)
        });

        router.on('/best-pet/cat/low-maintenance', () => {
            let filter = { grooming: 2, sheddingLevel: 3, healthIssues: 2 };
            bestPetController.filterCat(filter)
        });

        router.on('/best-pet/cat', () => {
            bestPetController.loadCatQuiz();
        });

         router.on('/contacts', () => {
            contactsController.loadContacts();
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