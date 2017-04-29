import handlebars from 'handlebars';
import { getCatFood } from 'db';
import { getTemplate } from 'templates';

class HomeController {
    loadHome() {
        getTemplate('home').then((template) => {
            $('#main-content-container').html(template());
        })
    }
}

const homeController = new HomeController();

export { homeController };