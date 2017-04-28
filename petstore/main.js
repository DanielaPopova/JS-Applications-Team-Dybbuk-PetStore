 import {getTemplate} from './scripts/helpers/template.js';
 import { data } from 'data';
 import { router } from 'router';
 

 
 router.init();
getTemplate();

 let test = data.testFunction();
console.log(' test ' + test);