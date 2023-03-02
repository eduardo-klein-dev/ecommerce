"use strict";
const button = document.querySelector('#button-products');
const products = document.querySelector('.list-products');
const start = document.querySelector('#button-start');
const purchase_screen = document.querySelector('.purchase-screen');
products.style.display = 'none';
button.addEventListener('click', () => {
    if (products.style.display == 'none') {
        products.style.display = 'block';
        start.classList.remove('active');
        button.classList.add('active');
    }
    else {
        products.style.display = 'none';
        start.classList.add('active');
        button.classList.remove('active');
    }
});
function productsOnBlur() {
    if (products.style.display == 'block') {
        products.style.display = 'none';
        start.classList.add('active');
        button.classList.remove('active');
    }
    else {
        products.style.display = 'none';
    }
}
function fechaProdutos() {
    purchase_screen.style.display = 'none';
}
