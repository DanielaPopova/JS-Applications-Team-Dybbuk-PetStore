import { router } from 'router';
import { updateCartIcon } from 'cart-manipulator';
import { userController } from 'user-controller';

updateCartIcon();
userController.updateLogInButton();


$('#cart-nav-button').click(() => window.location.href = '/#/cart');

router.init();