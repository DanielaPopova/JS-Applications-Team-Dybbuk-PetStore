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

    alertWithMessage(element, message, alertType) {

        let $validationMessage = $(`
            <div class="alert alert-${alertType}">
                <button type="button" class="close" data-dismiss="alert">x</button>
                <span>${message}</span>
            </div>`);

        $(element).empty();
        $(element).append($validationMessage);
        $validationMessage.alert();
        $validationMessage.fadeTo(3000, 500).slideUp(500, function () {
            $validationMessage.slideUp(500).remove();
        });
    }

    updateLogInButton() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                $('#main-log-in-btn').html('Log Out');
            } else {
                $('#main-log-in-btn').html('Log In');
            }
        });
    }

    userSignUp() {
        let _this = this;

        let $email = _this.formatUserInput($('#sign-up-email').val()),
            $password = _this.formatUserInput($('#sign-up-password').val()),
            $repeatedPassword = _this.formatUserInput($('#sign-up-repeat-password').val());

        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
            passwordPattern = /[a-zA-Z0-9_!#$%&?]{6,}/;

        let validEmail = _this.validateUserInput($email, emailPattern),
            validPassword = _this.validateUserInput($password, passwordPattern),
            validRepetedPassword = ($password === $repeatedPassword);

        if (!validEmail) {
            _this.alertWithMessage('#email-message', 'Invalid email address!', 'danger');
        } else if (!validPassword) {
            _this.alertWithMessage('#password-message', 'Passoword should be at least 6 valid symbols: latin letters, digits and [_!#$%&?]!', 'danger');
        } else if (!validRepetedPassword) {
            _this.alertWithMessage('#repeat-pass-message', 'Passwords do not match!', 'danger');
        } else {
            firebase.auth().createUserWithEmailAndPassword($email, $password)
                .then(function () {
                    $('#sign-up-email').val('');
                    $('#sign-up-password').val('');
                    $('#sign-up-repeat-password').val('');

                    _this.alertWithMessage('#message-container', 'Registration form is successfully send! Please login.', 'success');
                    $('#sign-in-email').focus();

                    firebase.auth().signOut();
                })
                .catch(function (error) {
                    let errorCode = error.code;
                    let errorMessage = error.message;

                    if (errorCode == 'auth/email-already-in-use') {
                        _this.alertWithMessage('#email-message', errorMessage, 'danger');
                    } else {
                        console.log("something went wrong");
                    }
                });
        }
    };

    userSignIn() {
        let _this = this;

        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
            _this.alertWithMessage('#message-container', 'This user is already signed in', 'warning');
        } else {
            let $email = $('#sign-in-email').val();
            let $password = $('#sign-in-password').val();

            firebase.auth().signInWithEmailAndPassword($email, $password)
                .then(function (user) {
                    _this.alertWithMessage('#message-container', 'You have successfully signed in!', 'success');
                    window.location.href = '/#/home';
                    _this.updateLogInButton();
                })
                .catch(function (error) {
                    let errorCode = error.code;
                    let errorMessage = error.message;

                    if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
                        _this.alertWithMessage('#login-wrong-message', 'Wrong email or password!', 'danger');
                    }
                });
        }
    };

    userSignOut() {
        let _this = this;

        firebase.auth().signOut().then(function () {            
            _this.alertWithMessage('#message-container', 'You have successfully signed out!', 'success');
            _this.updateLogInButton();
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    initializeUserLogin() {
        let _this = this;

        $('#sign-up-btn').on('click', () => this.userSignUp());
        $('#sign-in-btn').on('click', () => this.userSignIn());
        $('#main-log-in-btn').on('click', function () {
            if ($('#main-log-in-btn').html() === 'Log Out') {
                _this.userSignOut();
            }
        });
    };

    renderLoginForm() {
        getTemplate('login-register-form')
            .then((template) => {
                $('#main-content-container').html(template);
                this.initializeUserLogin();
            });
    };
}

let userController = new UserController();

export { userController };