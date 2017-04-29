
import { CatFood } from 'cat-food';
import { DogBreed } from 'dog-breed';

let data = (() => {

	let arr = [];
	let allDogBreeds = [];
	let dogBreeds = firebase.database().ref('dogBreeds').once('value').then(snap => {
		//console.log(snap.val());
		allDogBreeds.push(snap.val());

	});
	dogBreeds.then(function () {

		//console.log(allDogBreeds[0].akita);
	});

	
	function testFunction() {

		let arr = ['batman', 'pesho', 'todor'];

		return arr;
	}

	return {
		testFunction
	}

})();

export { data };



