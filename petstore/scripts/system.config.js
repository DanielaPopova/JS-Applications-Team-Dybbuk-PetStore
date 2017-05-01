SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        // system
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        // libs
        'navigo': './node_modules/navigo/lib/navigo.js',
        'handlebars': './node_modules/handlebars/dist/handlebars.js',
        'jquery': './node_modules/jquery/dist/jquery.js',
        'bootstrap': 'node_modules/bootstrap/dist/js/bootstrap.min.js',

        // local
        'main': './scripts/main.js',
        'data': './scripts/helpers/data.js',
        'router': './scripts/helpers/routing.js',
        'templates': './scripts/helpers/template.js',
        'db': './scripts/helpers/firebaseDB.js',
        'validator': './scripts/helpers/validator.js',
        'constants': './scripts/helpers/constants.js',
        'breed': './scripts/models/breed.js',
        'dog-breed': './scripts/models/dog-breed.js',
        'cat-breed': './scripts/models/cat-breed.js',
        'product': './scripts/models/product.js',
        'food': './scripts/models/food.js',
        'dog-food': './scripts/models/dog-food.js',
        'cat-food': './scripts/models/cat-food.js',
        'dog-accessory': './scripts/models/dog-accessory.js',
        'cat-accessory': './scripts/models/cat-accessory.js',
        'requester': './scripts/helpers/requester.js',
        'products-controller': './scripts/controllers/products-controller.js',
        'home-controller': './scripts/controllers/home-controller.js',
        'user-controller': './scripts/controllers/user-controller.js',
        'cart-controller': './scripts/controllers/cart-controller.js',
        'filter-string-to-filter-object': './scripts/helpers/filter-string-to-filter-object.js',
        'cart-manipulator': './scripts/helpers/cart-manipulator.js'
    }
});

System.import('main');