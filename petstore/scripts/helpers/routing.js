let router = (() => {

    let rout;

    function init() {
        rout = new Navigo(null, false);

        rout.on('/dogsBreed', () => {
            // TODO: change href attributes in a tags to existing routs  example href"#/home"
            //Promise.all(([data, template]), tl.get('allDogFood'))
            // 1 get data()
            // 2 .then(load content)

            console.log('e vi go');

        })

    }

    return {
        init
    }
})();

export { router }