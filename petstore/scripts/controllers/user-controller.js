import handlebars from 'handlebars';
import { getTemplate } from 'templates';

class UserControler {

    renderLoginForm() {

        getTemplate('login-register-form')
            .then((template) => {
                $('#main-content-container').html(template)
            });
    };

    addUserToDB(username, password, firstName, lastName) {

        let exists = checkIfUserExists(username);

        if(exists) {
            // proper msg to the user
        } else {
            // add the user 
        }
    };

    checkIfUserExists(user) {

        // returns bool value
    };
}

let userControler = new UserControler();

export { userControler };

