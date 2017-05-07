import handlebars from 'handlebars';
import $ from 'jquery';
import { getTemplate } from 'templates';

class HomeController {
    loadHome() {
        getTemplate('home').then((template) => {
            $('#main-content-container').html(template());
			$('.carousel').carousel({
                interval: 3500
            });
        })
    }
}

const homeController = new HomeController();

export { homeController };