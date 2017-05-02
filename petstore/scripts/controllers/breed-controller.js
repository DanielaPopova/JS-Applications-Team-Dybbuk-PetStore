import { getTemplate } from 'templates';
import { getAllDogBreeds } from 'db';
import { getAllCatBreeds } from 'db';

class BreedsControler {

    loadDogBreeds() {
        let requestDogBreeds = getAllDogBreeds();
        let requestDobBreedTemplate = getTemplate('breeds');

        Promise.all([requestDogBreeds, requestDobBreedTemplate]).then(([dogBreeds, dogBreedTemplate]) => {
           
            if (!dogBreeds) {
                window.location.href = "/#/dog-breeds-list/";
            }
             
            $('#main-content-container').html(dogBreedTemplate(dogBreeds));
        });
    }

    loadCatBreeds() {
        let requestCatBreeds = getAllCatBreeds();
        let requestCatBreedTemplate = getTemplate('breeds');

        Promise.all([requestCatBreeds, requestCatBreedTemplate]).then(([catBreeds, catBreedTemplate]) => {

            if (!catBreeds) {
                window.location.href = "/#/cat-breeds-list/";
            }

            $('#main-content-container').html(catBreedTemplate(catBreeds));
        });
    }
}

const breedController = new BreedsControler();

export { breedController };