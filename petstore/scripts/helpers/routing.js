import { productsController } from 'products-controller';

let router = (() => {
    let router;

    function init() {
        router = new Navigo(null, false);

        router.on('/dogsBreed', () => {
            // TODO: change href attributes in a tags to existing routs  example href"#/home"
            //Promise.all(([data, template]), tl.get('allDogFood'))
            // 1 get data()
            // 2 .then(load content)

            console.log('e vi go');

        });

        router.on('/cat-food-list', () => {
            productsController.loadCatFood();
        });

        router.resolve();
    }

    return {
        init
    }
})();

export { router }