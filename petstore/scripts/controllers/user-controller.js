import handlebars from 'handlebars';
import { getTemplate } from 'templates';
import $ from 'jquery';

class UserController {

    renderLoginForm() {

        getTemplate('login-register-form')
            .then((template) => {
                $('#main-content-container').html(template);
                this.initApp();
            });
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
                console.log(error);               
            });            
        }        
    };

    userSignUp(){
        console.log('Sign Up Start');
        let $email = $('#sign-up-email').val(),
            $password = $('#sign-up-password').val(),
            $repeatedPassword = $('#sign-up-repeat-password').val(),
            $firstName = $('#user-first-name').val(),
            $lastName = $('#user-last-name').val();

            // $email = this.formatUserInput($email);
            // $password = this.formatUserInput($password);
            // $repeatedPassword = this.formatUserInput($repeatedPassword);
            // $firstName = this.formatUserInput($firstName);
            // $lastName = this.formatUserInput($lastName);

            // this.validateEmail($email);
            // this.validatePassword($password);

            // if($repeatedPassword !== $password){
            //     throw new Error('Password does not match!');
            // }

            // this.validateName($firstName);
            // this.validateName( $lastName);
            

        firebase.auth().createUserWithEmailAndPassword($email, $password).catch(function(error) {        
            let errorCode = error.code;
            let errorMessage = error.message;
            
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
      });
    };

    initApp() {
        console.log('Init START');
        firebase.auth().onAuthStateChanged(function (user) {            
            if (user) {
                $('#nav-login-btn').html('Sing Out');
                //window.location.href = "/home";

                // User is signed in.
                let displayName = user.displayName;
                let email = user.email;
                let emailVerified = user.emailVerified;
                let photoURL = user.photoURL;
                let isAnonymous = user.isAnonymous;
                let uid = user.uid;
                let providerData = user.providerData;

            } else {
                $('#nav-login-btn').html('Sing In');
            }

        });
        $('#sign-up-btn').on('click', this.userSignUp);
        $('#sign-in-btn').on('click', this.userSignIn);
    };

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

    validatePassword(pass){
        let pattern = /[^a-zA-Z0-9_!#$%&?]{6,}/g;
        if (pass.match(pattern)) {
            throw new Error(`${pass} contains invalid symbols!`);
        }
    };

    validateEmail(email){
        let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
         if (email.match(pattern)) {
            throw new Error('Invalid email address!');
        }
    };
    
    validateName(name){
        let pattern = /[^a-zA-Z]/;
        if (name.match(pattern)) {
            throw new Error('Invalid email address!');
        }
    };  
}

let userController = new UserController();

export { userController };

