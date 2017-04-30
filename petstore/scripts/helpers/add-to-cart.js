export function addToCart(product) {
    const productCart = getProductsInCart();

    productCart.push(product);

    const productCartAsString = JSON.stringify(productCart);
    localStorage.productCart = productCartAsString;

    updateCartIcon();
}

export function getProductsInCart() {
    if (localStorage.productCart) {
        return JSON.parse(localStorage.productCart);
    } else {
        return [];
    }
}

export function updateCartIcon(productCount) {
    $('#shopping-cart-item-count').html(getProductsInCart().length);
}