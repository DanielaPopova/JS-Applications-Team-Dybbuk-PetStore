
import { CatFood } from 'cat-food';
import { DogBreed } from 'dog-breed';

function data(){

	let arr = [];
	let allDogBreeds = [];
	let dogBreeds = firebase.database().ref('dogBreeds').once('value').then(snap => {
		//console.log(snap.val());
		allDogBreeds.push(snap.val());

	});
	dogBreeds.then(function(){
		
		//console.log(allDogBreeds[0].akita);
	});

	console.log(allDogBreeds[0]);
}

export { data };