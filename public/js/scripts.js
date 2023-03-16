// Declaração de Variáveis:
var valor = $('#sessionID').val();
var idProdutoInserido = '';
idProdutoInserido = valor;
var idProduto = 0;
var qtdeProduto = 0;
var cart = [];
var estoque = 0;

const button = document.querySelector('#button-products');
const products = document.querySelector('.list-products');
const start = document.querySelector('#button-start');
const purchase_screen = document.querySelector('.purchase-screen');
const carrinho = document.querySelector('.popup-cart');
const telaComprasVazia = document.querySelector('.order-completion-screen-empty-display');
const telaComprasItens = document.querySelector('.order-completion-screen-content-display');
const telaComprasExclusão = document.querySelector('.order-completion-screen-content-display-exclude');
const fechaTelaItem = document.querySelector('.close-cart');

// Eventos de Click:
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
        products.style.display = 'none'
            ;
        start.classList.add('active');
        button.classList.remove('active');
    }
    else {
        products.style.display = 'none';
    }
};
function fechaProdutos() {
    purchase_screen.style.display = 'none';
}

function fechaTelaItemCart() {
    telaComprasItens.style.display = 'none';
}

function fechaTelaVaziaCart() {
    telaComprasVazia.style.display = 'none';
}

// Eventos de Json(API):
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

                var valor1 = json[i].valor;
                var novoValor1 = valor1.replace(".", "").replace(",", ".");
                var valor2 = ((novoValor1 * json[i].desconto) / 100).toFixed(2);
                var total = (novoValor1 - valor2);
                var totalFormatado = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                let preco = document.querySelector('.discount_price');
                preco.innerHTML = '<h4>R$ ' + totalFormatado + '</h4>';

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
                        estoque = qtde;
                    } else {
                        qtde = qtde;
                        estoque = qtde;
                    }
                });


                var buttonAdd = document.querySelector(".add-item");

                buttonAdd.addEventListener('click', () => {
                    idProduto = json[i].id;
                    qtdeProduto = qtde;

                    cart.push({
                        id: idProduto,
                        qtd: qtdeProduto
                    });

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
    telaComprasVazia.style.display = 'none';
    telaComprasItens.style.display = 'none';
    ScrenBuyItemPromo(id);
};

function insereItensPedido() {

    $.ajax({
        url: 'http://127.0.0.1:8000/api/ecommerce/enviaitempedido/' + idProdutoInserido + '/' + idProduto + '/' + qtdeProduto,
        type: 'POST',

        beforeSend: function () { },

        success: function () { },
    });
};

function addItemPedido(idProdutoInserido, idProduto, qtdeProduto) {
    insereItensPedido(idProdutoInserido, idProduto, qtdeProduto);
};

var BtnCarrinhoCompras = document.querySelector(".cart");
BtnCarrinhoCompras.addEventListener('click', () => {
    var promo = document.querySelector('.purchase-screen');
    promo.style.display = 'none'
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
                html += '<div class="order-completion-screen-content-body-item"><div class="order-completion-screen-content-body-item-img"><img src="public/imgs/produtos/' + json[i].id + '.png" alt=""></div><div class="order-completion-screen-content-body-item-text"><p>' + json[i].apelido + '</p><p style="font-style: italic;">Quantidade: ' + json[i].estoque + '</p><div id="price-discont"><p style="font-style: italic;">Valor Original Item:<p style="margin-left: 8px;font-style: italic;text-decoration: line-through;">R$ ' + json[i].valor + '</p></p><p style="margin-left: 8px;color: red;font-style: italic;">-' + json[i].desconto + '%</p></div><div id="total-price"><p style="font-style: italic;">Valor Total Item: </p><div class="total-price-discont-' + json[i].id + '" style="margin-left: 8px;font-style: italic;"></div></div></div><div class="order-completion-screen-content-body-item-icon"><i id="btn-trash-' + json[i].id + '" class="fa-solid fa-trash-can"></i></div></div>';
                document.querySelector('.order-completion-screen-content-body').innerHTML = html;
            };

            for (i in json) {

                var valor1 = json[i].valor;
                var novoValor1 = valor1.replace(".", "").replace(",", ".");
                var valor2 = ((novoValor1 * json[i].desconto) / 100).toFixed(2);
                var total = (novoValor1 - valor2);
                var totalFormatado = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                document.querySelector('.total-price-discont-' + json[i].id + '').innerHTML = '<p>R$ ' + totalFormatado + '</p>';

            }

            for (i in json) {
                let id = json[i].id;
                let apelido = json[i].apelido;
                let estoque = json[i].estoque;

                let btnTrash = document.querySelector('#btn-trash-' + id);

                btnTrash.addEventListener('click', () => {

                    telaComprasExclusão.style.display = 'block';
                    var NewHtml = `<h5>${apelido}</h5><img src="public/imgs/produtos/${id}.png" alt=""><h5><em>Quantidade: ${estoque}</em></h5>`
                    document.querySelector('.order-completion-screen-content-exclude-body').innerHTML = NewHtml;

                    btnSim = document.querySelector('#btn-confirm-exclude');
                    btnNao = document.querySelector('#btn-delete-exclude');

                    btnSim.addEventListener('click', () => {
                        removeItensPedido(idProdutoInserido, id);
                        telaComprasExclusão.style.display = 'none';
                        telaComprasItens.style.display = 'none';
                        setTimeout(() => {
                            document.location.reload();
                        }, 500);
                    });
                    btnNao.addEventListener('click', () => {
                        telaComprasExclusão.style.display = 'none';
                    });
                });
            }
        }
    });
};

var carrinhoVazio = document.querySelector('.order-completion-screen-empty-display');
var carrinhoCheio = document.querySelector('.order-completion-screen-content-display');

function verificaCarrinho(idProdutoInserido) {
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
}

function verificaCarrinhoPopUp(idProdutoInserido) {
    fetch('http://localhost:8000/api/ecommerce/consultacart/' + idProdutoInserido)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao consultar itens do carrinho');
            }
            return response.json();
        })
        .then(data => {
            var quantosItens = Object.keys(data).length;
            if (quantosItens > 0) {
                carrinho.style.display = 'block';
            } else {
                carrinho.style.display = 'none';
            };
        });
};

function removeItensPedido(idProdutoInserido, idProduto) {
    console.log(idProdutoInserido);
    console.log(idProduto);
    console.log('http://localhost:8000/api/ecommerce/removeitempedido/' + idProdutoInserido + '/' + idProduto)
    fetch('http://localhost:8000/api/ecommerce/removeitempedido/' + idProdutoInserido + '/' + idProduto, {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) {
            } else { }
        })
}
