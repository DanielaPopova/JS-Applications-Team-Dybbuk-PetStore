import handlebars from 'handlebars';
import { getTemplate } from 'templates';
import { getProductsInCart } from 'cart-manipulator';
import { removeFromCart } from 'cart-manipulator';

class CartController {
    loadCart() {
        let requestCartTemplate = getTemplate('cart');

        requestCartTemplate.then(template => {
            const products = getProductsInCart();
            let totalPrice = 0;

            for (let product of products) {
                totalPrice += product.price;
            }
            const templateObject = {
                products,
                totalPrice
            }

            $('#main-content-container').html(template(templateObject));

            $('.remove-from-cart-button').click(function() {
                const idInCart = +$(this).attr('name');

                // correct the total price before removing the element itself
                const currentTotalPrice = +$('#total-price-container').html();
                const removedItemPrice = +$(this)
                    .closest('.item-container')
                    .find('.item-price').html();
                $('#total-price-container').html(currentTotalPrice - removedItemPrice);

                removeFromCart(idInCart);
                $(this).closest('.shopping-cart-item').remove();
            });
        });
    }
}

const cartController = new CartController();

export { cartController };