var promotions = document.querySelector('.promotions');
var order = document.querySelector('.final-order');
var cartPedido = document.querySelector('.cart');
var nomeCliente = document.querySelector('#user-info');
var listagemItens = document.querySelector('.list-products-final-order');
var precoTotalItens = 0;
const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
};

function cliqueBotaoEnvia() {
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    }
    var nome = getCookie("Login");
    if (nome) {
        telaComprasItens.style.display = 'none';
        promotions.style.display = 'none';
        order.style.display = 'block';
        popUpCarrinho.style.display = 'none';
        cartPedido.style.display = 'none';
        nomeCliente.style.marginTop = '20px';
        finalizaPedido(session);
    } else {
        telaLogin.style.display = 'block';
        telaComprasItens.style.display = 'none';
    }
};

function finalizaPedido(session) {
    $.ajax({
        url: 'http://localhost:8000/api/ecommerce/finalizapedido/' + session,
        type: 'GET',
        dataType: 'json',

        beforeSend: function () { },

        success: function (json) {
            var html = '';

            for (i = 0; i < Object.keys(json).length; i++) {
                // json[i]['id_produto'];
                html += '<div class="product-final-order"><div class="product-final-order-left"><img src="public/imgs/produtos/' + json[i]['id_produto'] + '.png"></div><div class="product-final-order-right"><h5 class="product-final-order-name">' + json[i]['nome_produto'] + '</h5><label class="product-final-order-infos"><em>- Serial: ' + json[i]['serial_produto'] + '</em></label><br><label class="product-final-order-infos"><em>- Marca: ' + json[i]['nome_fornecedor'] + '</em></label><br><label class="product-final-order-infos"><em>- Quantidade: ' + json[i]['qt_produto'] + '</em></label></div><div class="product-final-order-price"><label style="text-decoration: line-through; font-size: 14px" class="price-scratched-' + json[i]['id_produto'] + '">R$' + json[i]['valor_produto'] + '</label><label style="color:red; font-size:14px" class="descont-item-' + json[i]['id_produto'] + '">' + json[i]['perc_desconto'] + '%</label><label class="price-total-' + json[i]['id_produto'] + '"><strong></strong></label></div></div>';


            };
            listagemItens.innerHTML = html;


            for (i = 0; i < Object.keys(json).length; i++) {
                var preco = document.querySelector('.price-total-' + json[i]['id_produto'] + '');
                var precoInicial = document.querySelector('.price-scratched-' + json[i]['id_produto'] + '');
                var desconto = document.querySelector('.descont-item-' + json[i]['id_produto'] + '');

                if (json[i]['perc_desconto'] > 0) {

                    var valor1 = json[i]['valor_produto'];
                    var novoValor1 = valor1.replace(".", "").replace(",", ".");
                    var valor2 = ((novoValor1 * json[i]['perc_desconto']) / 100).toFixed(2);
                    var total = (novoValor1 - valor2);
                    var qtde = parseInt(json[i]['qt_produto']);
                    totalItem = total * qtde;
                    var totalFormatado = totalItem.toLocaleString('pt-BR', options);
                    console.log(totalFormatado)

                    var preco = document.querySelector('.price-total-' + json[i]['id_produto'] + '');
                    preco.innerHTML = '<strong>R$ ' + totalFormatado + '</strong>';
                    precoInicial.innerHTML = 'R$ ' + valor1;
                    desconto.innerHTML = '<strong>-' + json[i]['perc_desconto'] + '%</strong>';
                    var precoTotalItem = parseFloat(total);
                    precoTotalItens = precoTotalItens + precoTotalItem;


                } else {

                    preco.innerHTML = '<strong>R$ ' + totalFormatado + '</strong>';
                    precoInicial.innerHTML = '';
                    desconto.innerHTML = '';
                    preco.innerHTML = '<strong>R$ ' + json[i]['valor_produto'] + '</strong>';

                    var numeroStr = json[i]['valor_produto'];
                    numeroStr = numeroStr.replace('.', '').replace(',', '.');
                    var numeroValor = parseFloat(numeroStr);

                    var qtde = parseInt(json[i]['qt_produto']);
                    totalItemStr = (numeroValor * qtde).toFixed(2);
                    var precoTotalItem = parseFloat(totalItemStr);

                    precoTotalItens = precoTotalItens + precoTotalItem
                }
            }

            const precoFormatado = precoTotalItens.toLocaleString('pt-BR', options);
            document.querySelector('#total-valor-itens').innerHTML = '<strong>Valor Total: R$ ' + precoFormatado + '</strong>';

        }
    });
};

// Script do Endereço:

const inputRua = document.querySelector('#input-address-rua');
const inputBairro = document.querySelector('#input-address-bairro');
const inputCidade = document.querySelector('#input-address-cidade');
const inputEstado = document.querySelector('#input-address-estado');


// Script do Pagamento:

// Funções de clique (métodos de pagamento):

const metodosPagamento = document.querySelector('.tittle-final-order-right-body');
const tituloPagamento = document.querySelector('#titulo-pagamentos');
const linhaPagamento = document.querySelector('.line-tittle-payments');

// Métodos de Pagamento:

const metodosDePagamento = document.querySelector('.final-order-body-right');
const metodoCartao = document.querySelector('#method-card');
const metodoCartaoDebito = document.querySelector('#method-card-debit');
const metodoPix = document.querySelector('#method-pix');
const metodoCarteiraDigital = document.querySelector('#method-carteira-digital');
const metodoBoleto = document.querySelector('#method-boleto');

const cartaoCredito = document.querySelector('#payment-option-1');
const cartaoDebito = document.querySelector('#payment-option-2');
const pix = document.querySelector('#payment-option-3');
const boleto = document.querySelector('#payment-option-4');
const carteiraDigital = document.querySelector('#payment-option-5');

// Fechar Telas:
const fechaCartaoCredito = document.querySelector('#close-cart-payment');
const fechaCartaoDebito = document.querySelector('#close-cart-debit-payment');
const fechaPix = document.querySelector('#close-pix');
const fechaCarteiraDigital = document.querySelector('#close-carteira-digital');
const fechaBoleto = document.querySelector('#close-boleto');

cartaoCredito.addEventListener('click', () => {
    metodosPagamento.style.display = 'none';
    tituloPagamento.style.display = 'none';
    linhaPagamento.style.display = 'none';
    metodoCartao.style.display = 'flex';
    metodosDePagamento.style.display = 'none';
});

fechaCartaoCredito.addEventListener('click', () => {
    metodoCartao.style.display = 'none';
    tituloPagamento.style.display = 'block';
    linhaPagamento.style.display = 'block';
    metodosPagamento.style.display = 'grid';
    metodosDePagamento.style.display = 'flex';
});

cartaoDebito.addEventListener('click', () => {
    metodosPagamento.style.display = 'none';
    tituloPagamento.style.display = 'none';
    linhaPagamento.style.display = 'none';
    metodoCartaoDebito.style.display = 'flex';
    metodosDePagamento.style.display = 'none';
});

fechaCartaoDebito.addEventListener('click', () => {
    metodoCartaoDebito.style.display = 'none';
    tituloPagamento.style.display = 'block';
    linhaPagamento.style.display = 'block';
    metodosPagamento.style.display = 'grid';
    metodosDePagamento.style.display = 'flex';
});

pix.addEventListener('click', () => {
    metodosPagamento.style.display = 'none';
    tituloPagamento.style.display = 'none';
    linhaPagamento.style.display = 'none';
    metodoPix.style.display = 'flex';
    metodosDePagamento.style.display = 'none';
});

fechaPix.addEventListener('click', () => {
    metodoPix.style.display = 'none';
    tituloPagamento.style.display = 'block';
    linhaPagamento.style.display = 'block';
    metodosPagamento.style.display = 'grid';
    metodosDePagamento.style.display = 'flex';
});


boleto.addEventListener('click', () => {
    metodosPagamento.style.display = 'none';
    tituloPagamento.style.display = 'none';
    linhaPagamento.style.display = 'none';
    metodoBoleto.style.display = 'flex';
    metodosDePagamento.style.display = 'none';
});

fechaBoleto.addEventListener('click', () => {
    metodoBoleto.style.display = 'none';
    tituloPagamento.style.display = 'block';
    linhaPagamento.style.display = 'block';
    metodosPagamento.style.display = 'grid';
    metodosDePagamento.style.display = 'flex';
});

carteiraDigital.addEventListener('click', () => {
    metodosPagamento.style.display = 'none';
    tituloPagamento.style.display = 'none';
    linhaPagamento.style.display = 'none';
    metodoCarteiraDigital.style.display = 'flex';
    metodosDePagamento.style.display = 'none';
});

fechaCarteiraDigital.addEventListener('click', () => {
    metodoCarteiraDigital.style.display = 'none';
    tituloPagamento.style.display = 'block';
    linhaPagamento.style.display = 'block';
    metodosPagamento.style.display = 'grid';
    metodosDePagamento.style.display = 'flex';
});

// Confirmações dos métodos de pagamento:

