import handlebars from 'handlebars';
import { getTemplate } from 'templates';

class UserControler {

    renderLoginForm() {

        getTemplate('login-register-form')
            .then((template) => {
                $('#main-content-container').html(template)
            });
    };

    addUserToDB() {

    };

    checkIfUserExists(user) {

    };
}

let userControler = new UserControler();

export { userControler };