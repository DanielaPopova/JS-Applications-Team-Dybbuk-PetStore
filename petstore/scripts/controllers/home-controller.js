import handlebars from 'handlebars';
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