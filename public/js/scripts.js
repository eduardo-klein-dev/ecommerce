"use strict";
const button = document.querySelector('#button-products');
const products = document.querySelector('.list-products');
products.style.display = 'none';
button.addEventListener('click', () => {
    if (products.style.display == 'none') {
        products.style.display = 'block';
    }
    else {
        products.style.display = 'none';
    }
});
function productsOnBlur() {
    if (products.style.display == 'block') {
        products.style.display = 'none';
    }
    else {
        products.style.display = 'none';
    }
}
