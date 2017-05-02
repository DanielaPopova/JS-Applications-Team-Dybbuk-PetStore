import { getTemplate } from 'templates';


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
                        console.log("go to dog")
                        window.location.hash = "#/best-pet/dog";
                        console.log(window.location.hash);
                    } else if ($isCatChecked) {
                        window.location.hash = "#/best-pet/cat";
                        console.log("go to cat")
                    } else {
                        console.log("nothing is checked")
                        loadCatDogChoise();
                    }
                });
            });
    }

    loadDogQuiz() {
        getTemplate('best-pet-dog')
            .then((template) => {
                $('#main-content-container').html(template);

                let $btn = $("search-best");

                $btn.on("click", function () {
                    const $isInteligentDogChecked = $("#intelligent").is(":checked");
                    const $isFamiliesDogChecked = $("#families").is(":checked");
                    const $isAppartmentDogChecked = $("#appartment").is(":checked");

                    if ($isInteligentDogChecked) {
                        // invoke function
                    } else if ($isFamiliesDogChecked) {
                        //invoke function
                    } else if ($isAppartmentDogChecked) {
                        // ..
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

                let $btn = $("search-best");

                $btn.on("click", function () {
                    const $isBestCatChecked = $("#best-cat").is(":checked");
                    const $isLowCatChecked = $("#low-maintenance").is(":checked");

                    if ($isBestCatChecked) {
                        // invoke function
                    } else if ($isLowCatChecked) {
                        //invoke function
                    } else {
                        loadCatQuiz();
                    }
                });
            });
    }
}

const bestPetController = new BestPetController();

export { bestPetController };