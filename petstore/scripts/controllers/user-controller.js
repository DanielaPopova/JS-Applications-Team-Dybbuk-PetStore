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


