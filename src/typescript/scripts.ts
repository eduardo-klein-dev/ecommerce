const button = document.querySelector('#button-products') as HTMLButtonElement;
const products = document.querySelector('.list-products') as HTMLElement;

products.style.display = 'none'

button.addEventListener('click', () => {

    if (products.style.display == 'none') {
        products.style.display = 'block';
    }
    else {
        products.style.display = 'none';
    }

}
);

function productsOnBlur() {
    if (products.style.display == 'block') {
        products.style.display = 'none';
    }
    else {
        products.style.display = 'none';
    }
}