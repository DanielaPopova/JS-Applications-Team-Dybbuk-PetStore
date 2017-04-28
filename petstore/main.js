 import {getTemplate} from './scripts/helpers/template.js';
 import { data } from 'data';
 import { router } from 'router';
 import * as db from 'db';
 
 // TESTING methods to extract data from firebase
db.filterCatFoodByAmount(1.5).then(function(filteredFood){
    if(filteredFood.length === 0){
		console.log('no results');
	}

	filteredFood.forEach(function(food){
		let img = document.createElement('img');
		img.style.width = '200px';
		img.style.height = '200px';
		img.src = food.imageURL;	
		let div = document.getElementById('main-content-container');
		div.appendChild(img);
		console.log(food.name);		
	});
});
 
router.init();
getTemplate();

 let test = data.testFunction();
console.log(' test ' + test);