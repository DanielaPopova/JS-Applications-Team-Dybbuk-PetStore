<<<<<<< HEAD
import { getTemplate } from 'templates';

class UserController{

    loadLoginRegistrationForm() {        
        let requestTemplate = getTemplate('login-register-form');
       
        requestTemplate.then(function (template) {
            console.log(template);
            $('#main-content-container').html(template(templateObject));

        });
    }
}


=======
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
>>>>>>> f44d52d3cf2ada2dc67f229873c1d7361f18a203
