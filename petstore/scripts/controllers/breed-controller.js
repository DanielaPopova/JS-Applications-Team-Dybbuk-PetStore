import { getTemplate } from 'templates';
import { database } from 'db';

class BreedsControler {

    loadDogBreeds() {
        let requestDogBreeds = database.getAllDogBreeds();
        let requestDobBreedTemplate = getTemplate('breeds');

        Promise.all([requestDogBreeds, requestDobBreedTemplate]).then(([dogBreeds, dogBreedTemplate]) => {
           
            if (!dogBreeds) {
                window.location.href = "/#/dog-breeds-list/";
            }
             
            $('#main-content-container').html(dogBreedTemplate(dogBreeds));
        });
    }

    loadCatBreeds() {
        let requestCatBreeds = database.getAllCatBreeds();
        let requestCatBreedTemplate = getTemplate('breeds');

        Promise.all([requestCatBreeds, requestCatBreedTemplate]).then(([catBreeds, catBreedTemplate]) => {

            if (!catBreeds) {
                window.location.href = "/#/cat-breeds-list/";
            }

            $('#main-content-container').html(catBreedTemplate(catBreeds));
        });
    }
	
	loadDogBreedDetails(dogBreedId) {
        let requestDogBreedDetails = database.getDogBreedDetails(dogBreedId);
        let requestDogBreedTemplate = getTemplate('dog-breed-details');
        
        Promise.all([requestDogBreedDetails, requestDogBreedTemplate]).then(([dogBreedDetails, dogBreedTemplate]) => {
            if (!dogBreedDetails) {                
                window.location.href = "/#/dog-breeds-list/";
            }

            $('#main-content-container').html(dogBreedTemplate(dogBreedDetails));  

            $('.el-inline').ready(function () {
                $('[data-toggle="tooltip"]').tooltip();   
            });  

            this._shareOnFaceBook();
        });
    }

    loadCatBreedDetails(catBreedId) {
        let requestCatBreedDetails = database.getCatBreedDetails(catBreedId);
        let requestCatBreedTemplate = getTemplate('cat-breed-details');
        
        Promise.all([requestCatBreedDetails, requestCatBreedTemplate]).then(([catBreedDetails, catBreedTemplate]) => {
            if (!catBreedDetails) {                
                window.location.href = "/#/cat-breeds-list/";
            }

            $('#main-content-container').html(catBreedTemplate(catBreedDetails)); 

            $('.el-inline').ready(function () {
                $('[data-toggle="tooltip"]').tooltip();   
            });   

            this._shareOnFaceBook();      
        });
    }

    _shareOnFaceBook(){
        let startIndex = window.location.href.indexOf('#');
        let hostUrl = `https://petstore-3b99e.firebaseapp.com/`;
        let breedDetailPath = window.location.href.substr(startIndex);
        let url = encodeURIComponent(hostUrl + breedDetailPath);
        let shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

        $('#facebook-share').on('click', function () {
            let fbpopup = window.open(shareUrl, "pop", "width=400, height=400, scrollbars=no");
            return false;
        });     
    }
}

const breedController = new BreedsControler();

export { breedController };