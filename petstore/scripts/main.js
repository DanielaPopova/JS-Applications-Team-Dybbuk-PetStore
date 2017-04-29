import { getTemplate } from 'templates';
import { data } from 'data';
import { router } from 'router';
import * as db from 'db';
import handlebars from 'handlebars';
import $ from 'jquery';

router.init();
console.log('Router loaded');
// TESTING methods to extract data from firebase
// db.filterCatFoodByAmount(1.5).then(function(filteredFood){
//     if(filteredFood.length === 0){
// 		console.log('no results');
// 	}

// 	filteredFood.forEach(function(food){
// 		let img = document.createElement('img');
// 		img.style.width = '200px';
// 		img.style.height = '200px';
// 		img.src = food.imageURL;	
// 		let div = document.getElementById('main-content-container');
// 		div.appendChild(img);
// 		console.log(food.name);		
// 	});
// });

//router.init();
// db.getAllCatFood().then(function(filteredFood) {
//     // filteredFood.forEach(function (food) {
//     // let img = document.createElement('img');
//     // let p = document.createElement('p');
//     // p.innerHTML = food.name;
//     // img.style.width = '200px';
//     // img.style.height = '200px';
//     // img.src = food.imageURL;
//     // let div = document.getElementById('main-content-container');
//     // div.appendChild(img);
//     // div.appendChild(p);

//     //console.log(filteredFood);

//     // $.ajax({
//     //     url: 'templates/cat-food.handlebars',
//     //     cache: true,
//     //     success: function(data) {

//     //         console.log(data);
//     //         var template = handlebars.compile(data);
//     //         var text = template(filteredFood);
//     //         $('#main-content-container').html(text);
//     //     }
//     // });


// });

// function getTemplateAjax(path) {
//     var source;
//     var template;

//     $.ajax({
//         url: path, //ex. js/templates/mytemplate.handlebars
//         cache: true,
//         success: function (data) {

//             //console.log(data);
//             template = handlebars.compile(data);
//             var text = template();
//             $('#main-content-container').html(template);
//         }
//     });
// }



// let test = data.testFunction();
// console.log(' test ' + test);