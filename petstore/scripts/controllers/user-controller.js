import handlebars from 'handlebars';
import { getTemplate } from 'templates';
import $ from 'jquery';

class UserController {

    formatUserInput(value) {
        value = value.trim();
        let htmlEscaper = /[&<>"'\/]/g,
            htmlEscapes = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        }; 

        function escapeHtml(str) {
            return String(str).replace(htmlEscaper, function (match) {
                return htmlEscapes[match];
            });
        }

        value = escapeHtml(value);
        return value;
    };

    validateUserInput(input, pattern) {
        return pattern.test(input);
    };

    alertWithErrorMessage(element, message) {
        $(element).css('border-color', 'red');
        $(element).focus();
        $(element).after(`</span><span class="help-block">${message}</span>`); 
    }    

    userSignUp(){
        let _this = this;
        
        let $email = this.formatUserInput($('#sign-up-email').val()),        
            $password = this.formatUserInput($('#sign-up-password').val()),
            $repeatedPassword = this.formatUserInput($('#sign-up-repeat-password').val());
            

        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
            passwordPattern = /[a-zA-Z0-9_!#$%&?]{6,}/;
           
        
        let validEmail = this.validateUserInput($email, emailPattern),
            validPassword = this.validateUserInput($password, passwordPattern),
            validRepetedPassword = ($password === $repeatedPassword);
           
        if (!validEmail) {
            this.alertWithErrorMessage('#sign-up-email', 'Invalid email address!');
        } else if (!validPassword) {
            this.alertWithErrorMessage('#sign-up-password', 'Passoword should be at least 6 symbols!');
        } else if (!validRepetedPassword) {
            this.alertWithErrorMessage('#sign-up-repeat-password', 'Password does not match!');
        }

        firebase.auth().createUserWithEmailAndPassword($email, $password).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/email-already-in-use') {
                _this.alertWithErrorMessage('#sign-up-email', errorMessage);
            }
        });
        
        $('#sign-up-email').val('');
        $('#sign-up-password').val('');
        $('#sign-up-repeat-password').val('');
    };

    userSignIn() {
        
        if (firebase.auth().currentUser) {            
            firebase.auth().signOut(); 
            
        } else {
            let $email = $('#sign-in-email').val();
            let $password = $('#sign-in-password').val();
            
            firebase.auth().signInWithEmailAndPassword($email, $password).catch(function (error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }                           
            });            
        }        
    };

    initApp() {        
        firebase.auth().onAuthStateChanged(function (user) {            
            if (user) {
                $('#main-log-in-btn').html('Log Out');             
            } else {
                $('#main-log-in-btn').html('Log In');
            }
        });

        $('#sign-up-btn').on('click', () => this.userSignUp());
        $('#sign-in-btn').on('click', () => this.userSignIn());
    };

    renderLoginForm() {

        getTemplate('login-register-form')
            .then((template) => {
                $('#main-content-container').html(template);
                this.initApp();
            });
    };     

    
}

let userController = new UserController();

export { userController };

