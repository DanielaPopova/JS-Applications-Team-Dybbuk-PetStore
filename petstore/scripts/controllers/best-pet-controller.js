import { getTemplate } from 'templates';
import { getDogQuizResults } from 'db';
import { getCatQuizResults } from 'db';


class BestPetController {
    
    loadCatDogChoise() {
        getTemplate('best-pet')
            .then((template) => {
                $('#main-content-container').html(template);

                let $btn = $("#btn-continue");

                $btn.on("click", function () {

                    const $isDogChecked = $("#btn-dog").is(":checked");
                    const $isCatChecked = $("#btn-cat").is(":checked");

                    if ($isDogChecked) {
                        window.location.hash = "#/best-pet/dog";                        
                    } else if ($isCatChecked) {
                        window.location.hash = "#/best-pet/cat";
                    } else {
                        loadCatDogChoise();
                    }
                });
            });
    }

    loadDogQuiz() {
        getTemplate('best-pet-dog')
            .then((template) => {
                $('#main-content-container').html(template);

                let $btn = $("#search-best");

                $btn.on("click", function () {
                    const $isInteligentDogChecked = $("#intelligent").is(":checked");
                    const $isFamiliesDogChecked = $("#families").is(":checked");
                    const $isAppartmentDogChecked = $("#appartment").is(":checked");

                    if ($isInteligentDogChecked) {
                        window.location.hash = "#/best-pet/dog/intelligent";
                    } else if ($isFamiliesDogChecked) {
                        window.location.hash = "#/best-pet/dog/families";
                    } else if ($isAppartmentDogChecked) {
                        window.location.hash = "#/best-pet/dog/appartment";
                    } else {
                        loadDogQuiz();
                    }
                });
            });
    }

    loadCatQuiz() {
        getTemplate('best-pet-cat')
            .then((template) => {
                $('#main-content-container').html(template);

                let $btn = $("#search-best");
                
                $btn.on("click", function () {
                    const $isBestCatChecked = $("#best-cat").is(":checked");
                    const $isLowCatChecked = $("#low-maintenance").is(":checked");

                    if ($isBestCatChecked) {
                        window.location.hash = "#/best-pet/cat/best-cat";
                    } else if ($isLowCatChecked) {
                        window.location.hash = "#/best-pet/cat/low-maintenance";
                    } else {
                        loadCatQuiz()
                    }
                });
            });
    }


    filterDog(filter) {
        let requestDogData = getDogQuizResults(filter);
        let quizTemplate = getTemplate('breeds');

        Promise.all([requestDogData, quizTemplate]).then(([dogBreedList, template]) => {
            $('#main-content-container').html(template(dogBreedList));
        })
    }

    filterCat(filter) {
        let requestCatData = getCatQuizResults(filter);
        let quizTemplate = getTemplate('breeds');

        Promise.all([requestCatData, quizTemplate]).then(([catBreedList, template]) => {
            $('#main-content-container').html(template(catBreedList));
        })
    }
}

const bestPetController = new BestPetController();

export { bestPetController };