"use strict";
var valor = $('#sessionID').val();
var idProdutoInserido = '';
idProdutoInserido = valor;
var idProduto = 0;
var qtdeProduto = 0;
var cart = [];

const button = document.querySelector('#button-products');
const products = document.querySelector('.list-products');
const start = document.querySelector('#button-start');
const purchase_screen = document.querySelector('.purchase-screen');
const carrinho = document.querySelector('.popup-cart');
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
    $.ajax({
        url: 'http://d06a0002n.dfs.local:8000/api/ecommerce/promotionsnew/' + id,
        type: 'GET',
        dataType: 'json',

        beforeSend: function () {
            $('.purchase-screen').html('<div style="margin-top:20px" class="carregando col-md-12">Carregando...</div>');
        },

        success: function (json) {

            for (var i in json) {

                document.querySelector('.purchase-screen').innerHTML = '<div class="purchase-screen-body"><div class="purchase-screen-body-left"><div class="purchase-screen-body-left-images"><div class="purchase-screen-body-left-image1"><img src="public/imgs/produtos/' + json[i].id + '.png" alt=""></div><div class="purchase-screen-body-left-image2"><img src="public/imgs/produtos/' + json[i].id + '-1.png" alt=""></div><div class="purchase-screen-body-left-image3"><img src="public/imgs/produtos/' + json[i].id + '-2.png" alt=""></div></div><div class="purchase-screen-body-left-main-image"><img src="public/imgs/produtos/' + json[i].id + '.png" alt=""></div></div><div class="purchase-screen-body-right"><div class="purchase-screen-body-right-content"><h4>' + json[i].produto + '</h4><p>' + json[i].serial + '</p><div class="purchase-screen-body-right-content-img"><img src="public/imgs/fornecedores/' + json[i].fornecedor + '.png" alt=""></div><div class="price"><h5 class="total_price"> R$ ' + json[i].valor + '</h5><h5 class="discount">-' + json[i].desconto + '%</h5></div><div class="discount_price"></div><div class="quantity_products"><div class="quantity_products-body"><div class="quantity_products_less">-</div><div class="quantity_products_number"></div><div class="quantity_products_more">+</div></div></div><div class="qtde-item"><em>Estoque: ' + json[i].estoque + '</em></div><div class="purchase-screen-body-right-content-buttons"><button action="" method="post" type="button" id="button-buy" class="add-item btn btn-success">Adicionar ao carrinho <i class="fa-solid fa-cart-plus"></i></button><button type="button" class="btn btn-danger" onclick="fechaProdutos()">Cancelar <i class="fa-solid fa-xmark"></i></button></div></div></div></div>';

                let preco = document.querySelector('.discount_price');
                var html = ' '

                var valor1 = parseFloat(json[i].valor).toFixed(2);
                var valor2 = ((valor1 * json[i].desconto) / 100).toFixed(2);

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

                var qtde = 1;
                number_marker.innerHTML = qtde;

                function addNumberQtde() {
                    qtde = qtde + 1;
                }
                function removeNumberQtde() {
                    qtde = qtde - 1;
                }

                button_add.addEventListener('click', () => {
                    if (qtde < json[i].estoque) {
                        addNumberQtde();
                        number_marker.innerHTML = qtde;
                    } else {
                        qtde = qtde;
                        alert("Você já atingiu o quantida máxima em estoque!");
                    }
                });

                button_remove.addEventListener('click', () => {
                    if (qtde > 1) {
                        removeNumberQtde();
                        number_marker.innerHTML = qtde;
                    } else {
                        qtde = qtde;
                    }
                });


                var buttonAdd = document.querySelector(".add-item");

                buttonAdd.addEventListener('click', () => {
                    idProduto = json[i].id;
                    qtdeProduto = qtde;
                    console.log()

                    cart.push({
                        id: idProduto,
                        qtd: qtdeProduto
                    });

                    console.log(cart)

                    purchase_screen.style.display = 'none';
                    carrinho.style.display = 'block';
                    addItemPedido();

                });

            }
        }
    });
};


function openScreenBuyPromo(id) {
    var promo = document.querySelector('.purchase-screen');
    promo.style.display = 'block'
    ScrenBuyItemPromo(id);
};

function insereItensPedido() {

    $.ajax({
        url: 'http://127.0.0.1:8000/api/ecommerce/enviaitempedido/' + idProdutoInserido + '/' + idProduto + '/' + qtdeProduto,
        type: 'POST',

        beforeSend: function () {
            console.log('/api/ecommerce/enviaitempedido/' + idProdutoInserido + '/' + idProduto + '/' + qtdeProduto)
        },

        success: function () {
            // console.log("Deu certo!")
        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Erro na requisição:", jqXHR.responseText);
            console.log("Status da requisição:", textStatus);
            console.log("Erro lançado:", errorThrown);
        }
    });
};

function addItemPedido(idProdutoInserido, idProduto, qtdeProduto) {
    insereItensPedido(idProdutoInserido, idProduto, qtdeProduto);
};

var BtnCarrinhoCompras = document.querySelector(".cart");
BtnCarrinhoCompras.addEventListener('click', () => {
    var telaRevisaoPedido = document.querySelector("order-completion-screen");
    ScrenCartBody(valor);
    verificaCarrinho(valor);
});

function ScrenCartBody(valor) {
    $.ajax({
        url: 'http://d06a0002n.dfs.local:8000/api/ecommerce/consultacart/' + valor,
        type: 'GET',
        dataType: 'json',

        beforeSend: function () {
            $('.purchase-screen').html('<div style="margin-top:20px; color:#141414;" class="carregando col-md-12">Carregando...</div>');
        },

        success: function (json) {
            var i;
            var html = '';
            var price = ' '
            var valor = 0;
            var desconto = 0;

            for (i = 0; i < Object.keys(json).length; i++) {
                html += '<div class="order-completion-screen-content-body-item"><div class="order-completion-screen-content-body-item-img"><img src="public/imgs/produtos/' + json[i].id + '.png" alt=""></div><div class="order-completion-screen-content-body-item-text"><p>' + json[i].apelido + '</p><p style="font-style: italic;">Quantidade: ' + json[i].estoque + '</p><div id="price-discont"><p style="font-style: italic;">Valor Original:<p style="margin-left: 5px;">R$ ' + json[i].valor + '</p></p><p style="margin-left: 5px;color: red;">-' + json[i].desconto + '%</p></div><div id="total-price"><p style="font-style: italic;">Valor Total: </p><div class="total-price-discont-'+ json[i].id +'" style="margin-left: 5px"></div></div></div><div class="order-completion-screen-content-body-item-icon"><i class="fa-solid fa-trash-can"></i></div></div>';

                valor = json[i].valor;
                desconto = json[i].desconto;

                var valor1 = parseFloat(valor).toFixed(2);
                var valor2 = ((valor1 * desconto) / 100).toFixed(2);

                var total = (valor1 - valor2).toFixed(2);
                var total_string = total.toString();
                var total_formatado = total_string.replace('.', ',')

                price = `R$ ${total_formatado}`;

                document.querySelector('.order-completion-screen-content-body').innerHTML = html;
                console.log(document.querySelector('.total-price-discont-'+ json[i].id +''))
                document.querySelector('.total-price-discont-'+ json[i].id +'').innerHTML = price;
            };

        }
    });
};

var carrinhoVazio = document.querySelector('.order-completion-screen-empty-display');
var carrinhoCheio = document.querySelector('.order-completion-screen-content-display');

function verificaCarrinho(idProdutoInserido) {
    console.log('http://localhost:8000//api/ecommerce/consultacart/' + idProdutoInserido)
    fetch('http://localhost:8000//api/ecommerce/consultacart/' + idProdutoInserido)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao consultar itens do carrinho');
            }
            return response.json();
        })
        .then(data => {
            var quantosItens = Object.keys(data).length;
            if (quantosItens > 0) {
                carrinhoCheio.style.display = 'block';
            } else {
                carrinhoVazio.style.display = 'block';
            }
        })
        .catch(error => {
            console.error(error);
        });
}