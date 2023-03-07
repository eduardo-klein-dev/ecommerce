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

function ScrenBuyItemPromo(id) {
    console.log('http://localhost:8000/api/ecommerce/promotionsnew/' + id)
    $.ajax({
        url: 'http://localhost:8000/api/ecommerce/promotionsnew/' + id,
        type: 'GET',
        dataType: 'json',

        beforeSend: function () {
            $('.purchase-screen').html('<div style="margin-top:20px" class="carregando col-md-12">Carregando...</div>');
        },

        success: function (json) {

            for (var i in json) {

                document.querySelector('.purchase-screen').innerHTML = '<div class="purchase-screen-body"><div class="purchase-screen-body-left"><div class="purchase-screen-body-left-images"><div class="purchase-screen-body-left-image1"><img src="public/imgs/produtos/' + json[i].id + '.png" alt=""></div><div class="purchase-screen-body-left-image2"><img src="public/imgs/produtos/' + json[i].id + '-1.png" alt=""></div><div class="purchase-screen-body-left-image3"><img src="public/imgs/produtos/' + json[i].id + '-2.png" alt=""></div></div><div class="purchase-screen-body-left-main-image"><img src="public/imgs/produtos/' + json[i].id + '.png" alt=""></div></div><div class="purchase-screen-body-right"><div class="purchase-screen-body-right-content"><h3>' + json[i].produto + '</h3><p>' + json[i].serial + '</p><div class="purchase-screen-body-right-content-img"><img src="public/imgs/fornecedores/' + json[i].fornecedor + '.png" alt=""></div><div class="price"><h5 class="total_price"> R$ ' + json[i].valor + '</h5><h5 class="discount">-' + json[i].desconto + '%</h5></div><div class="discount_price"></div><div class="quantity_products"><div class="quantity_products-body"><div class="quantity_products_more">+</div><div class="quantity_products_number">1</div><div class="quantity_products_less">-</div></div></div><div class="purchase-screen-body-right-content-buttons"><button type="button" id="button-buy" class="btn btn-success">Adicionar ao carrinho <i class="fa-solid fa-cart-plus"></i></button><button type="button" class="btn btn-danger" onclick="fechaProdutos()">Cancelar <i class="fa-solid fa-xmark"></i></button></div></div></div></div>';

                let preco = document.querySelector('.discount_price');
                var html = ' '

                var valor1 = parseFloat(json[i].valor).toFixed(2);
                var valor2 = ((valor1 * json[i].desconto) / 100).toFixed(2);

                console.log('VALOR1: ' + valor1)
                console.log('VALOR2: ' + valor2)

                var total = (valor1 - valor2).toFixed(2);
                var total_string = total.toString();
                var total_formatado = total_string.replace('.', ',')


                html = `R$ ${total_formatado}`;
                preco.innerHTML = `<h3>` + html + `</h3>`;

                var foto1 = document.querySelector('.purchase-screen-body-left-image1');
                var foto2 = document.querySelector('.purchase-screen-body-left-image2');
                var foto3 = document.querySelector('.purchase-screen-body-left-image3');
                var foto_principal = document.querySelector('.purchase-screen-body-left-main-image');

                if (foto_principal.innerHTML == '<img src="public/imgs/produtos/' + json[i].id + '.png" alt="">') {

                    foto1.addEventListener('click', () => {
                        foto_principal.innerHTML = '<img src="public/imgs/produtos/' + json[i].id + '.png" alt="">'
                    })

                    foto2.addEventListener('click', () => {
                        foto_principal.innerHTML = '<img src="public/imgs/produtos/' + json[i].id + '-1.png" alt="">'
                    })

                    foto3.addEventListener('click', () => {
                        foto_principal.innerHTML = '<img src="public/imgs/produtos/' + json[i].id + '-2.png" alt="">'
                    })

                }

                var button_add = document.querySelector(".quantity_products_more");
                var button_remove = document.querySelector(".quantity_products_less");
                var number_marker = document.querySelector(".quantity_products_number");

                

            }
        }
    });
};

function openScreenBuyPromo(id) {

    var promo = document.querySelector('.purchase-screen');
    promo.style.display = 'block'

    ScrenBuyItemPromo(id);

};