import { router } from 'router';
import { cartManipulator } from 'cart-manipulator';
import { userController } from 'user-controller';

cartManipulator.updateCartIcon();
userController.updateLogInButton();


$('#cart-nav-button').click(() => window.location.href = '/#/cart');

router.init();