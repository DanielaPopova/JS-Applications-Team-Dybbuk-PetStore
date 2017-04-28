
import { getAllData } from './firebaseDB.js';
import { DogBreed } from 'dog-breed';


function data(){

// function requestSomething(onSuccess, onFail){
    
//     let dbRefObj = firebase.database().ref('dogBreeds');
//     dbRefObj.on('value', getData);

//     function getData(data){
// 		console.log(data.val());
// 		setTimeout(() => onSuccess(data), 2000);
//     }
// };

// requestSomething(function (result) {	
// 	var alldata = result.val();
// 	let coli = alldata[0];
// 	let img = document.createElement('img');
// 	img.style.width = '200px';
// 	img.style.height = '200px';
// 	img.src = coli.imageURL;
// 	console.log(img.src);
// 	let div = document.getElementById('container');
// 	div.appendChild(img);
// });
//name, imageURL, description, childFriendly, grooming, healthIssues, intelligence,
   //     appFriendly, exerciseNeeds, trainability, size
import { getAllData } from './firebaseDB.js';
import { DogBreed } from 'dog-breed';

let arr = [];
let allDogBreeds = [];
let dogBreeds = firebase.database().ref('catBreeds').once('value').then(snap => {
	//console.log(snap.val());
	allDogBreeds.push(snap.val());

});
dogBreeds.then(function(){
	
	//console.log(allDogBreeds[0].akita);
});

console.log(allDogBreeds[0]);
//console.log(dogBreeds);
//allDogBreeds.push(dogBreeds);
//console.log(allDogBreeds);
// let doggiePromise = dogBreeds.child('beagle').once('value').then(function(snap){
// 	let obj = snap.val(),
// 	 	name = obj.name,
// 		 imageURL = obj.imageURL,
// 		 description = obj.description,
// 		 childFriendly = obj.childFriendly,
// 		 grooming = obj.grooming,
// 		 healthIssues = obj.healthIssues,
// 		 intelligence = obj.intelligence,
// 		 appFriendly = obj.appFriendly,
// 		 exerciseNeeds = obj.exerciseNeeds,
// 		 trainability = obj.trainability,
// 		 size = obj.size;
// 	let dog = new DogBreed(name, imageURL, description, childFriendly, grooming, healthIssues, intelligence, appFriendly, exerciseNeeds, trainability, size);
// 	arr.push(dog);

// 	console.log(dog);
	
// }, function(error){
// 	console.log(error);
// });
// console.log(arr);
// // function hello(){
// // 	return new Promise(function( resolve, reject){
// // 		console.log('object');
// // 		resolve();
// // 	});
// // }
// //hello().then(doggiePromise);






// function getDogPromise(id) {
//   return dogBreeds.child(id).once('value').then(function(snapshot) {
//     return snapshot.val();
//   });
// }

// // getDogPromise('akita').then(function(dog){
// // 	console.log(dog);
// // });



// // let list = [];
// //  db.ref('catFood').once('value').then(function(snap) {
// // 	 //console.log(snap.val());
// // 	 list = snap.val(); 
// // 	  return list;
// // 	});





//name, imageURL, description, price, amountInKg, catAgeSpecific
import { CatFood } from 'cat-food';

let name = 'dry food';
let imageURL = 'food.jpg';
let description = 'this is very good food ya know';
let price = 12.5;
let amountInKg = 3;
let catAgeSpecific = 'kitten';

let catFood =new CatFood(name, imageURL, description, price, amountInKg, catAgeSpecific);
//console.log(catFood);


}

export { data };