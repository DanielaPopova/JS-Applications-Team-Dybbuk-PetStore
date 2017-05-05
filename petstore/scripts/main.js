import { router } from 'router';
import { updateCartIcon } from 'cart-manipulator';

updateCartIcon();

$('#cart-nav-button').click(() => window.location.href = '/#/cart');

router.init();