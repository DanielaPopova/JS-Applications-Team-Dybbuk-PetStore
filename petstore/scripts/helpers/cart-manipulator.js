import { Product } from 'product';
import $ from 'jquery';
import Bootstrap from 'bootstrap';

export function addToCart(product) {
    const productCart = getProductsInCart();

    if (!localStorage.lastProductIdInCart) {
        localStorage.lastProductIdInCart = 0;
    }

    product.idInCart = +localStorage.lastProductIdInCart;
    localStorage.lastProductIdInCart++;

    productCart.push(product);

    const productCartAsString = JSON.stringify(productCart);
    localStorage.productCart = productCartAsString;

    updateCartIcon();

    let $successMessage = $(`
    <div class="alert alert-success">
        <button type="button" class="close" data-dismiss="alert">x</button>
        <span>Product ${product.name} added successfuly to the cart!</span>
    </div>`);

    $('#message-container').append($successMessage);
    $successMessage.alert();
    $successMessage.fadeTo(3000, 500).slideUp(500, function () {
        $successMessage.slideUp(500).remove();
    });
}

export function getProductsInCart() {
    if (localStorage.productCart) {
        return JSON.parse(localStorage.productCart).map(value => new Product(value));
    } else {
        return [];
    }
}

export function updateCartIcon(productCount) {
    if (getProductsInCart().length) {
        $('#shopping-cart-item-count').html(getProductsInCart().length);
    } else {
        $('#shopping-cart-item-count').html('');
    }

}

export function removeFromCart(idInCart) {
    const productCart = getProductsInCart();

    const filteredProductCart = productCart.filter(value => value.idInCart != +idInCart);

    const productCartAsString = JSON.stringify(filteredProductCart);
    localStorage.productCart = productCartAsString;

    updateCartIcon();
}