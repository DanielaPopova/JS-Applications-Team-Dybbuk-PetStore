import { getTemplate } from 'templates';


class BestPetController {


    loadCatDogChoise() {
        getTemplate('best-pet')
            .then((template) => {
                $('#main-content-container').html(template);
                this.initApp();
            });
    }
}

const bestPetController = new BestPetController();

export { bestPetController };