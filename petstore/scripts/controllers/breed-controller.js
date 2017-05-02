import { getTemplate } from 'templates';
import { getAllDogBreeds } from 'db';
import { getAllCatBreeds } from 'db';
import { getDogBreedDetails } from 'db';
import { getCatBreedDetails } from 'db';

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
	
	loadDogBreedDetails(dogBreedId) {
        let requestDogBreedDetails = getDogBreedDetails(dogBreedId);
        let requestDogBreedTemplate = getTemplate('dog-breed-details');
        
        Promise.all([requestDogBreedDetails, requestDogBreedTemplate]).then(([dogBreedDetails, dogBreedTemplate]) => {
            if (!dogBreedDetails) {                
                window.location.href = "/#/dog-breeds-list/";
            }

            $('#main-content-container').html(dogBreedTemplate(dogBreedDetails));  

            $('.el-inline').ready(function () {
                $('[data-toggle="tooltip"]').tooltip();   
            });       
        });
    }

    loadCatBreedDetails(catBreedId) {
        let requestCatBreedDetails = getCatBreedDetails(catBreedId);
        let requestCatBreedTemplate = getTemplate('cat-breed-details');
        
        Promise.all([requestCatBreedDetails, requestCatBreedTemplate]).then(([catBreedDetails, catBreedTemplate]) => {
            if (!catBreedDetails) {                
                window.location.href = "/#/cat-breeds-list/";
            }

            $('#main-content-container').html(catBreedTemplate(catBreedDetails)); 

            $('.el-inline').ready(function () {
                $('[data-toggle="tooltip"]').tooltip();   
            });         
        });
    }
}

const breedController = new BreedsControler();

export { breedController };