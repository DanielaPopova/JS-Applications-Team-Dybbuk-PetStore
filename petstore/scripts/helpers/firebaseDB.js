import { VALIDATOR } from 'validator';
import { CONSTANTS } from 'constants';

import { DogBreed } from 'dog-breed';
import { CatBreed } from 'cat-breed';
import { DogFood } from 'dog-food';
import { CatFood } from 'cat-food';
import { DogAccessory } from 'dog-accessory';
import { CatAccessory } from 'cat-accessory';

export function getAllDogBreeds() {
    return firebase.database().ref('dogBreeds').once('value').then(function(snapshot) {
        let dogBreeds = [],
            allDogs = snapshot.val();

        allDogs.forEach(function(dog, index) {
            let name = dog.name,
                imageURL = dog.imageURL,
                description = dog.description,
                childFriendly = dog.childFriendly,
                grooming = dog.grooming,
                healthIssues = dog.healthIssues,
                intelligence = dog.intelligence,
                appFriendly = dog.appFriendly,
                exerciseNeeds = dog.exerciseNeeds,
                trainability = dog.trainability,
                size = dog.size;

            let dogObj = new DogBreed(name, imageURL, description, childFriendly, grooming, healthIssues, intelligence, appFriendly, exerciseNeeds, trainability, size);

            dogObj.dogId = index;
            dogObj.breedDetailPath = '/dog-breeds-details/' + index;           
            dogBreeds.push(dogObj);
        });

        return dogBreeds;
    });
}

export function getDogBreedDetails(id){
     return firebase.database().ref('dogBreeds/' + id).once('value').then(function(snapshot) {
        const dogBreed = snapshot.val();

        if (!dogBreed) {
            return null;
        }

        let name = dogBreed.name,
            imageURL = dogBreed.imageURL,
            description = dogBreed.description,
            childFriendly = dogBreed.childFriendly,
            grooming = dogBreed.grooming,
            healthIssues = dogBreed.healthIssues,
            intelligence = dogBreed.intelligence,
            appFriendly = dogBreed.appFriendly,
            exerciseNeeds = dogBreed.exerciseNeeds,
            trainability = dogBreed.trainability,
            size = dogBreed.size;

        let dogBreedObj = new DogBreed(name, imageURL, description, childFriendly, grooming, healthIssues, intelligence, appFriendly, exerciseNeeds, trainability, size);
        
        dogBreedObj.dogBreedId = id;
        dogBreedObj.breedDetailPath = '/dog-breeds-details/' + id;

        return dogBreedObj;
    });
}

export function getAllCatBreeds() {
    return firebase.database().ref('catBreeds').once('value').then(function(snapshot) {
        let catBreeds = [],
            allCats = snapshot.val();

        allCats.forEach(function(cat, index) {
            let name = cat.name,
                imageURL = cat.imageURL,
                description = cat.description,
                childFriendly = cat.childFriendly,
                grooming = cat.grooming,
                healthIssues = cat.healthIssues,
                intelligence = cat.intelligence,
                energyLevel = cat.energyLevel,
                adaptability = cat.adaptability,
                sheddingLevel = cat.sheddingLevel;

            let catObj = new CatBreed(name, imageURL, description, childFriendly, grooming, healthIssues, intelligence, energyLevel, adaptability, sheddingLevel);
            
            catObj.catId = index;
            catObj.breedDetailPath = '/cat-breeds-details/' + index; 
            catBreeds.push(catObj);
        });

        return catBreeds;
    });
}

export function getCatBreedDetails(id){
     return firebase.database().ref('catBreeds/' + id).once('value').then(function(snapshot) {
        const catBreed = snapshot.val();

        if (!catBreed) {
            return null;
        }

        let name = catBreed.name,
            imageURL = catBreed.imageURL,
            description = catBreed.description,
            childFriendly = catBreed.childFriendly,
            grooming = catBreed.grooming,
            healthIssues = catBreed.healthIssues,
            intelligence = catBreed.intelligence,
            energyLevel = catBreed.energyLevel,
            adaptability = catBreed.adaptability,
            sheddingLevel = catBreed.sheddingLevel;
            
        let catBreedObj = new CatBreed(name, imageURL, description, childFriendly, grooming, healthIssues, intelligence, energyLevel, adaptability, sheddingLevel);
        
        catBreedObj.catBreedId = id;
        catBreedObj.breedDetailPath = '/cat-breeds-details/' + id;

        return catBreedObj;
    });
}

export function getAllDogFood() {
    return firebase.database().ref('dogFood').once('value').then(function(snapshot) {
        let dogFoodList = [],
            allDogFood = snapshot.val();

        allDogFood.forEach(function(dogFood) {
            let name = dogFood.name,
                imageURL = dogFood.imageURL,
                description = dogFood.description,
                price = dogFood.price,
                amountInKg = dogFood.amountInKg,
                dogAgeSpecific = dogFood.dogAgeSpecific,
                dogSizeSpecific = dogFood.dogSizeSpecific;

            let dogFoodObj = new DogFood(name, imageURL, description, price, amountInKg, dogAgeSpecific, dogSizeSpecific);
            dogFoodList.push(dogFoodObj);
        });

        return dogFoodList;
    });
}

export function getDogFood(filter) {
    if (typeof filter != 'object') {
        filter = {};
    }

    return firebase.database().ref('dogFood').once('value').then(function(snapshot) {
        let dogFoodList = [],
            dogFoodListIn = snapshot.val();

        dogFoodListIn.forEach(function(dogFood, index) {
            let name = dogFood.name,
                imageURL = dogFood.imageURL,
                description = dogFood.description,
                price = dogFood.price,
                amountInKg = dogFood.amountInKg,
                dogAgeSpecific = dogFood.dogAgeSpecific,
                dogSizeSpecific = dogFood.dogSizeSpecific;

            let dogFoodObj = new DogFood(name, imageURL, description, price, amountInKg, dogAgeSpecific, dogSizeSpecific);
            // Maybe these should be in the constructor...
           
            dogFoodObj.dogFoodId = index;
            dogFoodObj.productDetailPath = '/dog-food-details/' + index;
            dogFoodList.push(dogFoodObj);
        });
        
        for (let filterKey in filter) {
            dogFoodList = dogFoodList.filter(dogFoodItem => {
                for (let filterValue of filter[filterKey]) {
                    if (dogFoodItem[filterKey] == filterValue) {
                        return true;
                    }
                }

                return false;
            });
        }

        return dogFoodList;
    });
}

export function getDogFoodDetails(id) {
    return firebase.database().ref('dogFood/' + id).once('value').then(function(snapshot) {
        const dogFood = snapshot.val();

        if (!dogFood) {
            return null;
        }

        let name = dogFood.name,
            imageURL = dogFood.imageURL,
            description = dogFood.description,
            price = dogFood.price,
            amountInKg = dogFood.amountInKg,
            dogAgeSpecific = dogFood.dogAgeSpecific,
            dogSizeSpecific = dogFood.dogSizeSpecific;
            					
        let dogFoodObj = new DogFood(name, imageURL, description, price, amountInKg, dogAgeSpecific, dogSizeSpecific);
        
        dogFoodObj.dogFoodId = id;
        dogFoodObj.productDetailPath = '/dog-food-details/' + id;

        return dogFoodObj;
    });
}
export function getCatFoodDetails(id) {
    return firebase.database().ref('catFood/' + id).once('value').then(function(snapshot) {
        const catFood = snapshot.val();

        if (!catFood) {
            return null;
        }

        let name = catFood.name,
            imageURL = catFood.imageURL,
            description = catFood.description,
            price = catFood.price,
            amountInKg = catFood.amountInKg,
            catAgeSpecific = catFood.catAgeSpecific;

        let catFoodObj = new CatFood(name, imageURL, description, price, amountInKg, catAgeSpecific);
        // Maybe these should be in the constructor...
        catFoodObj.catFoodId = id;
        catFoodObj.productDetailPath = '/cat-food-details/' + id;

        return catFoodObj;
    });
}

export function getCatFood(filter) {
    if (typeof filter != 'object') {
        filter = {};
    }

    return firebase.database().ref('catFood').once('value').then(function(snapshot) {
        let catFoodList = [],
            catFoodListIn = snapshot.val();

        catFoodListIn.forEach(function(catFood, index) {
            let name = catFood.name,
                imageURL = catFood.imageURL,
                description = catFood.description,
                price = catFood.price,
                amountInKg = catFood.amountInKg,
                catAgeSpecific = catFood.catAgeSpecific;

            let catFoodObj = new CatFood(name, imageURL, description, price, amountInKg, catAgeSpecific);
            // Maybe these should be in the constructor...
            catFoodObj.catFoodId = index;
            catFoodObj.productDetailPath = '/cat-food-details/' + index;
            catFoodList.push(catFoodObj);
        });

        for (let filterKey in filter) {
            catFoodList = catFoodList.filter(catFoodItem => {
                for (let filterValue of filter[filterKey]) {
                    if (catFoodItem[filterKey] == filterValue) {
                        return true;
                    }
                }

                return false;
            });
        }

        return catFoodList;
    });
}

export function getAllCatFood() {
    return firebase.database().ref('catFood').once('value').then(function(snapshot) {
        let catFoodList = [],
            allCatFood = snapshot.val();

        allCatFood.forEach(function(catFood) {
            let name = catFood.name,
                imageURL = catFood.imageURL,
                description = catFood.description,
                price = catFood.price,
                amountInKg = catFood.amountInKg,
                catAgeSpecific = catFood.catAgeSpecific;

            let catFoodObj = new CatFood(name, imageURL, description, price, amountInKg, catAgeSpecific);
            catFoodList.push(catFoodObj);
        });

        return catFoodList;
    });
}

export function getAllDogAccessories() {
    return firebase.database().ref('dogAccessories').once('value').then(function(snapshot) {
        let dogAccessories = [],
            allDogAccessories = snapshot.val();

        allDogAccessories.forEach(function(dogAccessory, index) {
            let name = dogAccessory.name,
                imageURL = dogAccessory.imageURL,
                description = dogAccessory.description,
                price = dogAccessory.price;

            let dogAccessoryObj = new DogAccessory(name, imageURL, description, price);

            dogAccessoryObj.dogAccessoryId = index;
            dogAccessoryObj.productDetailPath = '/dog-items-details/' + index;
            dogAccessories.push(dogAccessoryObj);
        });

        return dogAccessories;
    });
}

export function getDogAccessoryDetails(id) {
    return firebase.database().ref('dogAccessories/' + id).once('value').then(function(snapshot) {
        const dogAccessories = snapshot.val();

        if (!dogAccessories) {
            return null;
        }

        let name = dogAccessories.name,
            imageURL = dogAccessories.imageURL,
            description = dogAccessories.description,
            price = dogAccessories.price;           

        let dogAccessoryObj = new DogAccessory(name, imageURL, description, price);
       
        dogAccessoryObj.dogAccessoryId = id;
        dogAccessoryObj.productDetailPath = '/dog-items-details/' + id;
        
        return dogAccessoryObj;
    });
}

export function getAllCatAccessories() {
    return firebase.database().ref('catAccessories').once('value').then(function(snapshot) {
        let catAccessories = [],
            allCatAccessories = snapshot.val();

        allCatAccessories.forEach(function(catAccessory, index) {
            let name = catAccessory.name,
                imageURL = catAccessory.imageURL,
                description = catAccessory.description,
                price = catAccessory.price;

            let catAccessoryObj = new CatAccessory(name, imageURL, description, price);   
            catAccessoryObj.catAccessoryId = index;
            catAccessoryObj.productDetailPath = '/cat-items-details/' + index;         
            catAccessories.push(catAccessoryObj);
        });

        return catAccessories;
    });
}

export function getCatAccessoryDetails(id) {
    return firebase.database().ref('catAccessories/' + id).once('value').then(function(snapshot) {
        const catAccessories = snapshot.val();

        if (!catAccessories) {
            return null;
        }

        let name = catAccessories.name,
            imageURL = catAccessories.imageURL,
            description = catAccessories.description,
            price = catAccessories.price;           

        let catAccessoryObj = new CatAccessory(name, imageURL, description, price);
        
        catAccessoryObj.catAccessoryId = id;
        catAccessoryObj.productDetailPath = '/cat-items-details/' + id;        

        return catAccessoryObj;
    });
}

export function loadDogQuizResults(filter){

    if (typeof filter != 'object') {
        throw new Error(`${filter} must be object!`);
    }

    let allFilters = Object.keys(filter).length;
    let filteredDogBreeds = [];

    getAllDogBreeds().then(function(dogBreedList){

        dogBreedList.forEach(function (dogBreed) {
            let matches = 0;
            for (let key in filter) {            
                if (dogBreed[key] >= filter[key]) {
                    matches++;
                }           
            }
            
            if (matches === allFilters) {
                filteredDogBreeds.push(dogBreed);
            }
        });

        return filteredDogBreeds;
    });    
}

export function loadCatQuizResults(filter){

    if (typeof filter != 'object') {
        throw new Error(`${filter} must be object!`);
    }

    let allFilters = Object.keys(filter).length;
    let filteredCatBreeds = [];

    getAllCatBreeds().then(function(catBreedList){

        catBreedList.forEach(function (catBreed) {
            let matches = 0;
            for (let key in filter) { 
                if(key === 'childFriendly'){
                    if (catBreed[key] >= filter[key]) {
                        matches++;
                    } 
                } else {
                    if (catBreed[key] <= filter[key]) {
                        matches++;
                    } 
                }        
            }
            
            if (matches === allFilters) {
                filteredCatBreeds.push(catBreed);
            }
        });

        return filteredCatBreeds;
    });    
}