var promotions = document.querySelector('.promotions');
var order = document.querySelector('.final-order');
var cartPedido = document.querySelector('.cart');
var nomeCliente = document.querySelector('#user-info');
var listagemItens = document.querySelector('.list-products-final-order');
var precoTotalItens = 0;
var isChecked = false;
var isCheckedAdress = false;
var isCheckedPayment = false;

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

var qtdeItens = 0;

function finalizaPedido(session) {
    $.ajax({
        url: 'http://localhost:8000/api/ecommerce/finalizapedido/' + session,
        type: 'GET',
        dataType: 'json',

        beforeSend: function () { },

        success: function (json) {
            var html = '';

            for (i = 0; i < Object.keys(json).length; i++) {

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
                    var totalItem = total * qtde;
                    var totalItemFormatado = totalItem.toLocaleString('pt-BR', options);

                    total = total.toString();
                    total = total.replace('.', ',');
                    preco.innerHTML = '<strong>' + json[i]['qt_produto'] + 'x   R$ ' + total + '</strong>';
                    precoInicial.innerHTML = 'R$ ' + valor1;
                    desconto.innerHTML = '<strong>-' + json[i]['perc_desconto'] + '%</strong>';
                    var precoTotalItem = parseFloat(totalItem);
                    precoTotalItens = precoTotalItens + precoTotalItem;


                } else {

                    var item = parseInt(json[i]['valor_produto']);
                    var qtde = parseInt(json[i]['qt_produto']);
                    var totalItem = item * qtde;
                    var totalFormatado = totalItem.toLocaleString('pt-BR', options);
                    preco.innerHTML = '<strong>R$ ' + totalFormatado + '</strong>';
                    precoInicial.innerHTML = '';
                    desconto.innerHTML = '';
                    var total = json[i]['valor_produto'];
                    total = total.toString();
                    total = total.replace('.', ',');
                    preco.innerHTML = '<strong>' + json[i]['qt_produto'] + 'x   R$ ' + json[i]['valor_produto'] + '</strong>';

                    var numeroStr = json[i]['valor_produto'];
                    numeroStr = numeroStr.replace('.', '').replace(',', '.');
                    var numeroValor = parseFloat(numeroStr);

                    var qtde = parseInt(json[i]['qt_produto']);
                    totalItemStr = (numeroValor * qtde).toFixed(2);
                    var precoTotalItem = parseFloat(totalItemStr);

                    precoTotalItens = precoTotalItens + precoTotalItem
                }
            }

            const parcela = document.querySelector('#parcelas');

            var valorParcela1 = precoTotalItens;
            var valorParcela2 = (precoTotalItens / 2).toFixed(2);
            var valorParcela3 = (precoTotalItens / 3).toFixed(2);
            var valorParcela4 = (precoTotalItens / 4).toFixed(2);
            var valorParcela5 = (precoTotalItens / 5).toFixed(2);
            var valorParcela6 = (((precoTotalItens * 0.05) + precoTotalItens) / 6).toFixed(2);
            var valorParcela7 = (((precoTotalItens * 0.10) + precoTotalItens) / 7).toFixed(2);
            var valorParcela8 = (((precoTotalItens * 0.15) + precoTotalItens) / 8).toFixed(2);

            valorParcela1 = parseFloat(valorParcela1)
            valorParcela2 = parseFloat(valorParcela2)
            valorParcela3 = parseFloat(valorParcela3)
            valorParcela4 = parseFloat(valorParcela4)
            valorParcela5 = parseFloat(valorParcela5)
            valorParcela6 = parseFloat(valorParcela6)
            valorParcela7 = parseFloat(valorParcela7)
            valorParcela8 = parseFloat(valorParcela8)

            var opcoes = {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            };

            var valorParcelaStr1 = '1x ' + valorParcela1.toLocaleString('pt-BR', opcoes);
            var valorParcelaStr2 = '2x ' + valorParcela2.toLocaleString('pt-BR', opcoes);
            var valorParcelaStr3 = '3x ' + valorParcela3.toLocaleString('pt-BR', opcoes);
            var valorParcelaStr4 = '4x ' + valorParcela4.toLocaleString('pt-BR', opcoes);
            var valorParcelaStr5 = '5x ' + valorParcela5.toLocaleString('pt-BR', opcoes);
            var valorParcelaStr6 = '6x ' + valorParcela6.toLocaleString('pt-BR', opcoes) + '*';
            var valorParcelaStr7 = '7x ' + valorParcela7.toLocaleString('pt-BR', opcoes) + '*';
            var valorParcelaStr8 = '8x ' + valorParcela8.toLocaleString('pt-BR', opcoes) + '*';

            parcela.innerHTML = '<option selected>' + valorParcelaStr1 + '</option><option>' + valorParcelaStr2 + '</option><option>' + valorParcelaStr3 + '</option><option>' + valorParcelaStr4 + '</option><option>' + valorParcelaStr5 + '</option><option>' + valorParcelaStr6 + '</option><option>' + valorParcelaStr7 + '</option><option>' + valorParcelaStr8 + '</option>'


            const precoFormatado = precoTotalItens.toLocaleString('pt-BR', options);
            document.querySelector('#total-valor-itens').innerHTML = '<strong>Valor Total dos Itens: R$ ' + precoFormatado + '</strong>';
            qtdeItens = Object.keys(json).length;
        }
    });
};

// Script do Endereço:

const inputRua = document.querySelector('#input-address-rua');
const inputBairro = document.querySelector('#input-address-bairro');
const inputCidade = document.querySelector('#input-address-cidade');
const inputEstado = document.querySelector('#input-address-estado');

var linhaAddress = document.querySelector('.line-address');
var confirmAddress = document.querySelector('.final-order-address-confirm');
var erroAddress = document.querySelector('.final-order-address-erro');
var divButtonAltera = document.querySelector('#div-botao-altera');
var divButtonConfirma = document.querySelector('#div-botao-confirma');

const adressOne = document.querySelector('#rua-bairro-address');
const adressTwo = document.querySelector('#cidade-estado-address');

const idCookie = '';
function pegaValorId() {
    function getIDCookie() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith("ID=")) {
                return cookie.substring(3, cookie.length);
            }
        }
        return null;
    }

    const idCookie = getIDCookie();
    if (idCookie) {
        consultaEndereco(idCookie)
    } else {
        // console.log("Cookie 'ID' não encontrado.");
    }
}

function consultaEndereco(idusuario) {
    $.ajax({
        url: 'http://localhost:8000/api/ecommerce/consultaendereco/' + idusuario,
        type: 'GET',
        dataType: 'json',

        beforeSend: function () { },

        success: function (json) {
            var html1 = '';
            var html2 = '';

            for (i = 0; i < Object.keys(json).length; i++) {

                html1 += '<div><label class="form-label mt-2">Rua:</label><input id="input-rua-confirm" type="text" class="form-control" placeholder="' + json[i]['rua'] + '" disabled value="' + json[i]['rua'] + '"></div><div><label class="form-label mt-2">Bairro:</label><input id="input-bairro-confirm" type="text" class="form-control" placeholder="' + json[i]['bairro'] + '" disabled value="' + json[i]['bairro'] + '"></div>';
                html2 += '<div><label class="form-label mt-2">Cidade:</label><input id="input-cidade-confirm" type="text" class="form-control" placeholder="' + json[i]['cidade'] + '" disabled value="' + json[i]['cidade'] + '"></div><div><label class="form-label mt-2">Estado:</label><input id="input-estado-confirm" type="text" class="form-control" placeholder="' + json[i]['estado'] + '" disabled value="' + json[i]['estado'] + '"></div>';

            }

            adressOne.innerHTML = html1;
            adressTwo.innerHTML = html2;
        }
    });
};

function cliqueAlteraEndereço() {
    isCheckedAdress = false;
    divButtonConfirma.innerHTML = '<button id="button-confirm-address" onclick="cliqueConfirmaEndereço()" type="button" class="btn btn-light">Confirmar Endereço</button>';
    adressOne.innerHTML = '<div><label class="form-label mt-2">Rua:</label><input id="input-rua-confirm" type="text" class="form-control"></div><div><label class="form-label mt-2">Bairro:</label><input id="input-bairro-confirm" type="text" class="form-control"></div>'
    adressTwo.innerHTML = '<div><label class="form-label mt-2">Cidade:</label><input id="input-cidade-confirm" type="text" class="form-control"></div><div><label class="form-label mt-2">Estado:</label><select id="input-estado-confirm" class="form-control"><option>Escolha a opção</option><option>Acre</option><option>Alagoas</option><option>Amapá</option><option>Amazonas</option><option>Bahia</option><option>Ceará</option><option>Espírito Santo</option><option>Goiás</option><option>Maranhão</option><option>Mato Grosso</option><option>Mato Grosso do Sul</option><option>Pará</option><option>Paraíba</option><option>Paraná</option><option>Pernambuco</option><option>Piauí</option><option>Rio de Janeiro</option><option>Rio Grande do Norte</option><option>Rio Grande do Sul</option><option>Rondônia</option><option>Roraima</option><option>Santa Catarina</option><option>São Paulo</option><option>Sergipe</option><option>Tocantins</option></select ></div ></div > '
    if (confirmAddress.style.display == 'block') {
        confirmAddress.style.display = 'none';
    };
};

var RuaConfirm = '';
var BairroConfirm = '';
var CidadeConfirm = '';
var EstadoConfirm = '';

function cliqueConfirmaEndereço() {
    var InputRuaConfirm = document.querySelector('#input-rua-confirm');
    var InputBairroConfirm = document.querySelector('#input-bairro-confirm');
    var InputCidadeConfirm = document.querySelector('#input-cidade-confirm');
    var InputEstadoConfirm = document.querySelector('#input-estado-confirm');

    RuaConfirm = InputRuaConfirm.value;
    BairroConfirm = InputBairroConfirm.value;
    CidadeConfirm = InputCidadeConfirm.value;
    EstadoConfirm = InputEstadoConfirm.value;

    if (RuaConfirm == '' || BairroConfirm == '' || CidadeConfirm == '' || EstadoConfirm == '') {
        erroAddress.style.display = 'block';
        linhaAddress.style.marginTop = '10px';

        setTimeout(() => {
            erroAddress.style.display = 'none';
            linhaAddress.style.marginTop = '20px';
        }, 5000);

    } else {
        confirmAddress.style.display = 'block';
        linhaAddress.style.marginTop = '10px';
        divButtonConfirma.innerHTML = '';
        isCheckedAdress = true;

        divButtonAltera.innerHTML = '<button id="button-change-address" style="margin-left: 0px !important" onclick="cliqueAlteraEndereço()" type="button" class="btn btn-light">Alterar Endereço de Entrega</button>';

    }
}

// CheckBoxes Para Selecionar o tipo de Entrega:


const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let selectedCheckbox = null;

function uncheckOtherBoxes(currentCheckbox) {
    checkboxes.forEach((checkbox) => {
        if (checkbox !== currentCheckbox) {
            checkbox.checked = false;
        }
    });
    selectedCheckbox = currentCheckbox;
    isChecked = true;
    verificaEntrega();
}

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', function () {
        uncheckOtherBoxes(this);
    });
});

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

// Inputs dos métodos de pagamento:

var inputCartaoCredito = document.querySelector('#cartao-credit-input');
var inputCartaoDebito = document.querySelector('#cartao-debit-input');
var inputCartaoCreditoNome = document.querySelector('#nome-credit-input');
var inputCartaoDebitoNome = document.querySelector('#nome-debit-input');
var inputMesValidade = document.querySelector('#mes-cartao-input');
var inputAnoValidade = document.querySelector('#ano-cartao-input');
var valueInputCVV = document.querySelector('#cvv-input-credit');
var valueInputCVVDebit = document.querySelector('#cvv-input-debit');
var inputsCpfPix = document.querySelector('#cpf-pix');
var inputsEmailPix = document.querySelector('#email-pix');
var inputsNomePix = document.querySelector('#nome-pix');
var inputsCpfBoleto = document.querySelector('#cpf-boleto');
var inputsEmailBoleto = document.querySelector('#email-boleto');
var inputsNomeBoleto = document.querySelector('#nome-boleto');
var inputsCpfCarteira = document.querySelector('#cpf-carteiradigital');
var inputsEmailCarteira = document.querySelector('#email-carteiradigital');
var inputsNomeCarteira = document.querySelector('#nome-carteiradigital');

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
    inputCartaoCredito.value = '';
    inputCartaoCreditoNome.value = '';
    inputMesValidade.value = '';
    inputAnoValidade.value = '';
    valueInputCVV.value = '';
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
    inputCartaoDebito.value = '';
    valueInputCVVDebit.value = '';
    inputCartaoDebitoNome.value = '';
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
    inputsCpfPix.value = '';
    inputsNomePix.value = '';
    inputsEmailPix.value = '';
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
    inputsCpfBoleto.value = '';
    inputsEmailBoleto.value = '';
    inputsNomeBoleto.value = '';
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
    inputsCpfCarteira.value = '';
    inputsNomeCarteira.value = '';
    inputsEmailCarteira.value = '';
});

// Confirmações dos dados dos métodos de pagamento:

const cpfInputs = document.querySelectorAll('.cpf-input');
const inputsNomeCartaoCredit = document.querySelector('#nome-credit-input');
const inputsNomeCartaoDebit = document.querySelector('#nome-debit-input');
const InputcartaoCredito = document.querySelectorAll('#cartao-credit-input');
const InputcartaoDebito = document.querySelectorAll('#cartao-debit-input');
const CreditoCVV = document.querySelectorAll('#cvv-input-credit');
const DebitoCVV = document.querySelectorAll('#cvv-input-debit');
const nomePix = document.querySelector('#nome-pix');
const nomeBoleto = document.querySelector('#nome-boleto');
const nomeCarteiraDigital = document.querySelector('#nome-carteiradigital');

cpfInputs.forEach(input => {
    input.addEventListener('input', () => {
        let cpf = input.value.replace(/\D/g, '');
        cpf = cpf.substring(0, 11);
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        input.value = cpf;
    });
});

InputcartaoCredito.forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length > 16) {
            this.value = this.value.slice(0, 16);
        }
        this.value = this.value.replace(/^(\d{4})?(\d{4})?(\d{4})?(\d{4})?$/, function (match, g1, g2, g3, g4) {
            return [g1, g2, g3, g4].filter(Boolean).join(' ');
        });
    });
});

InputcartaoDebito.forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length > 16) {
            this.value = this.value.slice(0, 16);
        }
        this.value = this.value.replace(/^(\d{4})?(\d{4})?(\d{4})?(\d{4})?$/, function (match, g1, g2, g3, g4) {
            return [g1, g2, g3, g4].filter(Boolean).join(' ');
        });
    });
});

CreditoCVV.forEach(input => {
    input.addEventListener('input', () => {
        let cvv = input.value.replace(/\D/g, '');
        input.value = cvv;
    });
});

DebitoCVV.forEach(input => {
    input.addEventListener('input', () => {
        let cvv = input.value.replace(/\D/g, '');
        input.value = cvv;
    });
});

inputsNomeCartaoCredit.addEventListener('input', () => {
    let nome = inputsNomeCartaoCredit.value;
    nome = nome.replace(/[0-9]/g, '');
    nome = nome.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
    inputsNomeCartaoCredit.value = nome;
});

inputsNomeCartaoDebit.addEventListener('input', () => {
    let nome = inputsNomeCartaoDebit.value;
    nome = nome.replace(/[0-9]/g, '');
    nome = nome.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
    inputsNomeCartaoDebit.value = nome;
});

nomePix.addEventListener('input', () => {
    let nome = nomePix.value;
    nome = nome.replace(/[0-9]/g, '');
    nome = nome.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
    nomePix.value = nome;
});

nomeBoleto.addEventListener('input', () => {
    let nome = nomeBoleto.value;
    nome = nome.replace(/[0-9]/g, '');
    nome = nome.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
    nomeBoleto.value = nome;
});

nomeCarteiraDigital.addEventListener('input', () => {
    let nome = nomeCarteiraDigital.value;
    nome = nome.replace(/[0-9]/g, '');
    nome = nome.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
    nomeCarteiraDigital.value = nome;
});

// Confirmar método de pagamento:

const formularioCredito = document.querySelector('#form-credit');
const formularioDebito = document.querySelector('#form-debit');
const formularioPix = document.querySelector('#form-pix');
const formularioBoleto = document.querySelector('#form-boleto');
const formularioCarteiraDigital = document.querySelector('#form-carteiradigital');

var opcaoCartaoCredito = document.querySelector('#payment-option-1');
var opcaoCartaoDebito = document.querySelector('#payment-option-2');
var opcaoPix = document.querySelector('#payment-option-3');
var opcaoBoleto = document.querySelector('#payment-option-4');
var opcaoCarteiraDigital = document.querySelector('#payment-option-5');

formularioCredito.addEventListener('submit', function (evento) {
    if (opcaoCartaoDebito.classList.contains("selected") || opcaoPix.classList.contains("selected") || opcaoBoleto.classList.contains("selected") || opcaoCarteiraDigital.classList.contains("selected")) {
        opcaoCartaoDebito.classList.remove("selected");
        opcaoPix.classList.remove("selected");
        opcaoBoleto.classList.remove("selected");
        opcaoCarteiraDigital.classList.remove("selected");
    }
    evento.preventDefault();
    opcaoCartaoCredito.classList.add('selected');
    metodoCartao.style.display = 'none';
    tituloPagamento.style.display = 'block';
    linhaPagamento.style.display = 'block';
    metodosPagamento.style.display = 'grid';
    metodosDePagamento.style.display = 'flex';
    isCheckedPayment = true;
    montarTabela();
});

formularioDebito.addEventListener('submit', function (evento) {
    if (opcaoCartaoCredito.classList.contains("selected") || opcaoPix.classList.contains("selected") || opcaoBoleto.classList.contains("selected") || opcaoCarteiraDigital.classList.contains("selected")) {
        opcaoCartaoCredito.classList.remove("selected");
        opcaoPix.classList.remove("selected");
        opcaoBoleto.classList.remove("selected");
        opcaoCarteiraDigital.classList.remove("selected");
    }
    evento.preventDefault();
    opcaoCartaoDebito.classList.add('selected');
    metodoCartaoDebito.style.display = 'none';
    tituloPagamento.style.display = 'block';
    linhaPagamento.style.display = 'block';
    metodosPagamento.style.display = 'grid';
    metodosDePagamento.style.display = 'flex';
    isCheckedPayment = true;
    montarTabela();
});

formularioPix.addEventListener('submit', function (evento) {
    if (opcaoCartaoCredito.classList.contains("selected") || opcaoCartaoDebito.classList.contains("selected") || opcaoBoleto.classList.contains("selected") || opcaoCarteiraDigital.classList.contains("selected")) {
        opcaoCartaoCredito.classList.remove("selected");
        opcaoCartaoDebito.classList.remove("selected");
        opcaoBoleto.classList.remove("selected");
        opcaoCarteiraDigital.classList.remove("selected");
    }
    evento.preventDefault();
    opcaoPix.classList.add('selected');
    metodoPix.style.display = 'none';
    tituloPagamento.style.display = 'block';
    linhaPagamento.style.display = 'block';
    metodosPagamento.style.display = 'grid';
    metodosDePagamento.style.display = 'flex';
    isCheckedPayment = true;
    montarTabela();
});

formularioBoleto.addEventListener('submit', function (evento) {
    if (opcaoCartaoCredito.classList.contains("selected") || opcaoCartaoDebito.classList.contains("selected") || opcaoPix.classList.contains("selected") || opcaoCarteiraDigital.classList.contains("selected")) {
        opcaoCartaoCredito.classList.remove("selected");
        opcaoCartaoDebito.classList.remove("selected");
        opcaoPix.classList.remove("selected");
        opcaoCarteiraDigital.classList.remove("selected");
    }
    evento.preventDefault();
    opcaoBoleto.classList.add('selected');
    metodoBoleto.style.display = 'none';
    tituloPagamento.style.display = 'block';
    linhaPagamento.style.display = 'block';
    metodosPagamento.style.display = 'grid';
    metodosDePagamento.style.display = 'flex';
    isCheckedPayment = true;
    montarTabela();
});

formularioCarteiraDigital.addEventListener('submit', function (evento) {
    if (opcaoCartaoCredito.classList.contains("selected") || opcaoCartaoDebito.classList.contains("selected") || opcaoPix.classList.contains("selected") || opcaoBoleto.classList.contains("selected")) {
        opcaoCartaoCredito.classList.remove("selected");
        opcaoCartaoDebito.classList.remove("selected");
        opcaoPix.classList.remove("selected");
        opcaoBoleto.classList.remove("selected");
    }
    evento.preventDefault();
    opcaoCarteiraDigital.classList.add('selected');
    metodoCarteiraDigital.style.display = 'none';
    tituloPagamento.style.display = 'block';
    linhaPagamento.style.display = 'block';
    metodosPagamento.style.display = 'grid';
    metodosDePagamento.style.display = 'flex';
    isCheckedPayment = true;
    montarTabela();
});

// Confirmação do pedido:

var divTable = document.querySelector('.end-of-order-completion-body');
var valorCheckBox = 0;

function verificaEntrega() {
    if (selectedCheckbox) {
        if (selectedCheckbox.value == 'option1') {
            valorCheckBox = 20;
            var table = document.querySelector('.end-of-order-completion-body-table');
            if (table.innerHTML == '') { } else {
                var idValorEntrega = document.querySelector('#h5-valor-entrega');
                montarTabela();
                if (idValorEntrega.innerHTML == 'Valor da Entrega: --/--') {
                    idValorEntrega.innerHTML = 'Valor da Entrega: R$' + valorCheckBox + ',00';
                }
            }
        }
        else {
            valorCheckBox = 10;
            var table = document.querySelector('.end-of-order-completion-body-table');
            if (table.innerHTML == '') { } else {
                var idValorEntrega = document.querySelector('#h5-valor-entrega');
                montarTabela();
                if (idValorEntrega.innerHTML == 'Valor da Entrega: --/--') {
                    idValorEntrega.innerHTML = 'Valor da Entrega: R$' + valorCheckBox + ',00';
                }
            }
        }
    }
};

var precoTotalString = '';
function montarTabela() {
    var htmlTable = '';
    var precototal = 0;
    var precoTotalItensFormatado = '';
    const options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };

    if (opcaoCartaoDebito.classList.contains('selected')) {

        var PTI = document.querySelector('#total-valor-itens').innerHTML;
        PTI = PTI.replace('<strong>', '');
        PTI = PTI.replace('</strong>', '');
        precototal = ((precoTotalItens * 0.9) + valorCheckBox).toFixed(2);
        precoTotalString = precototal.toLocaleString('pt-BR', options);
        precoTotalString = precoTotalString.replace('.', ',');

        if (valorCheckBox == 0) {
            htmlTable += '<table class="table"><tbody><tr><td><h5>' + PTI + '</h5></td></tr><tr><td><h5>Desconto do Plano de pagamento: 10%</h5></td></tr><tr><td><h5 id="h5-valor-entrega">Valor da Entrega: --/--</h5></td></tr><tr><td id="finaliza-compra-valor-total-pedido"><h5>Valor Total do Pedido: R$ ' + precoTotalString + '</h5></td></tr></tbody></table><div id="erro_finalização_pedido">Alguma informação não foi preenchida!<br>Favor Revisar as informações inseridas!</div><div class="buttons-status-pedido"><button onclick="cancelaCompra()" type="button" class="btn btn-danger">Cancelar</button><button type="button" onclick="finalizaCompraFinal()" class="btn btn-success">Confirmar Pedido</button></div>';
        } else {
            htmlTable += '<table class="table"><tbody><tr><td><h5>' + PTI + '</h5></td></tr><tr><td><h5>Desconto do Plano de pagamento: 10%</h5></td></tr><tr><td><h5 id="h5-valor-entrega">Valor da Entrega: R$ ' + valorCheckBox + ',00</h5></td></tr><tr><td id="finaliza-compra-valor-total-pedido"><h5>Valor Total do Pedido: R$ ' + precoTotalString + '</h5></td></tr></tbody></table><div id="erro_finalização_pedido">Alguma informação não foi preenchida!<br>Favor Revisar as informações inseridas!</div><div class="buttons-status-pedido"><button onclick="cancelaCompra()" type="button" class="btn btn-danger">Cancelar</button><button type="button" onclick="finalizaCompraFinal()" class="btn btn-success">Confirmar Pedido</button></div>';
        }

    } else if (opcaoPix.classList.contains('selected')) {

        var PTI = document.querySelector('#total-valor-itens').innerHTML;
        PTI = PTI.replace('<strong>', '');
        PTI = PTI.replace('</strong>', '');
        precototal = ((precoTotalItens * 0.85) + valorCheckBox).toFixed(2);
        precoTotalString = precototal.toLocaleString('pt-BR', options);
        precoTotalString = precoTotalString.replace('.', ',');

        if (valorCheckBox == 0) {
            htmlTable += '<table class="table"><tbody><tr><td><h5>' + PTI + '</h5></td></tr><tr><td><h5>Desconto do Plano de pagamento: 10%</h5></td></tr><tr><td><h5 id="h5-valor-entrega">Valor da Entrega: --/--</h5></td></tr><tr><td id="finaliza-compra-valor-total-pedido"><h5>Valor Total do Pedido: R$ ' + precoTotalString + '</h5></td></tr></tbody></table><div id="erro_finalização_pedido">Alguma informação não foi preenchida!<br>Favor Revisar as informações inseridas!</div><div class="buttons-status-pedido"><button onclick="cancelaCompra()" type="button" class="btn btn-danger">Cancelar</button><button type="button" onclick="finalizaCompraFinal()" class="btn btn-success">Confirmar Pedido</button></div>';
        } else {
            htmlTable += '<table class="table"><tbody><tr><td><h5>' + PTI + '</h5></td></tr><tr><td><h5>Desconto do Plano de pagamento: 15%</h5></td></tr><tr><td><h5 id="h5-valor-entrega">Valor da Entrega: R$ ' + valorCheckBox + ',00</h5></td></tr><tr><td id="finaliza-compra-valor-total-pedido"><h5>Valor Total do Pedido: R$ ' + precoTotalString + '</h5></td></tr></tbody></table><div id="erro_finalização_pedido">Alguma informação não foi preenchida!<br>Favor Revisar as informações inseridas!</div><div class="buttons-status-pedido"><button onclick="cancelaCompra()" type="button" class="btn btn-danger">Cancelar</button><button type="button" onclick="finalizaCompraFinal()" class="btn btn-success">Confirmar Pedido</button></div>';
        }

    } else {

        var PTI = document.querySelector('#total-valor-itens').innerHTML
        PTI = PTI.replace('<strong>', '');
        PTI = PTI.replace('</strong>', '');
        precototal = (precoTotalItens + valorCheckBox).toFixed(2);
        precoTotalString = precototal.toLocaleString('pt-BR', options);
        precoTotalString = precoTotalString.replace('.', ',');

        if (valorCheckBox == 0) {
            htmlTable += '<table class="table"><tbody><tr><td><h5>' + PTI + '</h5></td></tr><tr><td><h5 id="h5-valor-entrega">Valor da Entrega: --/--</h5></td></tr><tr><td id="finaliza-compra-valor-total-pedido"><h5>Valor Total do Pedido: R$ ' + precoTotalString + '</h5></td></tr></tbody></table><div id="erro_finalização_pedido">Alguma informação não foi preenchida!<br>Favor Revisar as informações inseridas!</div><div class="buttons-status-pedido"><button onclick="cancelaCompra()" type="button" class="btn btn-danger">Cancelar</button><button type="button" onclick="finalizaCompraFinal()" class="btn btn-success">Confirmar Pedido</button></div>';
        } else {
            htmlTable += '<table class="table"><tbody><tr><td><h5>' + PTI + '</h5></td></tr><tr><td><h5 id="h5-valor-entrega">Valor da Entrega: R$ ' + valorCheckBox + ',00</h5></td></tr><tr><td id="finaliza-compra-valor-total-pedido"><h5>Valor Total do Pedido: R$ ' + precoTotalString + '</h5></td></tr></tbody></table><div id="erro_finalização_pedido">Alguma informação não foi preenchida!<br>Favor Revisar as informações inseridas!</div><div class="buttons-status-pedido"><button onclick="cancelaCompra()" type="button" class="btn btn-danger">Cancelar</button><button type="button" onclick="finalizaCompraFinal()" class="btn btn-success">Confirmar Pedido</button></div>';
        }
    }

    divTable.innerHTML = '<div class="end-of-order-completion-body-table"></div>';

    setTimeout(() => {
        var table = document.querySelector('.end-of-order-completion-body-table');
        table.innerHTML = htmlTable;
    }, 100);
};

function cancelaCompra() {
    telaComprasItens.style.display = 'none';
    promotions.style.display = 'block';
    order.style.display = 'none';
    popUpCarrinho.style.display = 'block';
    cartPedido.style.display = 'block';
    nomeCliente.style.marginTop = '0px';
}

var telaNumPed = document.querySelector('.final-order-confirmation-screen');
var numPed = document.querySelector('#numped');

function finalizaCompraFinal() {
    var finalizaCompraFinalErro = document.querySelector('#erro_finalização_pedido');

    if (isChecked == true && isCheckedAdress == true && isCheckedPayment == true) {
        order.style.display = 'none';
        promotions.style.display = 'none';
        telaNumPed.style.display = 'flex';
        numPed.innerHTML = 'CÓDIGO DO SEU PEDIDO: <label>' + session + '</label>';
        popUpCarrinho.style.display = 'block';
        cartPedido.style.display = 'block';
        nomeCliente.style.marginTop = '0px';
        document.cookie = 'PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        confirmaPedidoDados();

        setTimeout(() => {
            console.log('chegou aqui!')
            telaNumPed.style.display = 'none';
            promotions.style.display = 'flex';
            location.reload();
        }, 5000);

    } else {
        finalizaCompraFinalErro.style.display = 'block';

        setTimeout(() => {
            finalizaCompraFinalErro.style.display = 'none';
        }, 5000)
    }
};

document.querySelector('.icon-close-final-order').addEventListener('click', () => {
    telaComprasItens.style.display = 'none';
    promotions.style.display = 'block';
    order.style.display = 'none';
    popUpCarrinho.style.display = 'block';
    cartPedido.style.display = 'block';
    nomeCliente.style.marginTop = '0px';
})

// Declaração de variáveis usadas em confirmaPedidoDados():

var idCliente = 0;
var ConfirmaRua = '';
var ConfirmaBairro = '';
var ConfirmaCidade = '';
var ConfirmaEstado = '';
var IdEntrega = 0;
var formapagamento = '';

function confirmaPedidoDados() {
    // Pega seção para inserção no cabeçalho do pedido:
    // console.log(session);

    // ID do cliente para inserção no cabeçalho do pedido:
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf("ID=") == 0) {
            idCliente = cookie.substring("ID=".length, cookie.length);
            break;
        }
    }
    // console.log(idCliente);

    // Pega informações do endereço para inserção no cabeçalho do pedido:
    ConfirmaRua = document.querySelector('#input-rua-confirm').value;
    ConfirmaBairro = document.querySelector('#input-bairro-confirm').value;
    ConfirmaCidade = document.querySelector('#input-cidade-confirm').value;
    ConfirmaEstado = document.querySelector('#input-estado-confirm').value;

    // Pega informações do tipo de entrega para inserção no cabeçalho do pedido:

    if (valorCheckBox == 20) {
        IdEntrega = 2;
    } else {
        IdEntrega = 1;
    }
    //console.log(IdEntrega);

    // Pega informações do método de pagamento para inserção no cabeçalho do pedido:

    if (opcaoCartaoCredito.classList.contains('selected')) {
        formapagamento = 'Cartão de Crédito';
    } if (opcaoCartaoDebito.classList.contains('selected')) {
        formapagamento = 'Cartão de Debito';
    } if (opcaoPix.classList.contains('selected')) {
        formapagamento = 'Pix';
    } if (opcaoBoleto.classList.contains('selected')) {
        formapagamento = 'Boleto';
    } if (opcaoCarteiraDigital.classList.contains('selected')) {
        formapagamento = 'Carteira Digital';
    }
    //console.log(formapagamento);

    // Pega informações da quantida de itens para inserção no cabeçalho do pedido:
    //console.log(qtdeItens);

    // Pega informações do valor total do pedido para inserção no cabeçalho do pedido:
    //console.log(precoTotalString);

    confirmaPedido(session, idCliente, ConfirmaRua, ConfirmaBairro, ConfirmaCidade, ConfirmaEstado, IdEntrega, formapagamento, qtdeItens, precoTotalString);
}

function confirmaPedido() {

    $.ajax({
        url: 'http://localhost:8000/api/ecommerce/confirmapedido/' + session + '/' + idCliente + '/' + ConfirmaRua + '/' + ConfirmaBairro + '/' + ConfirmaCidade + '/' + ConfirmaEstado + '/' + IdEntrega + '/' + formapagamento + '/' + qtdeItens + '/' + precoTotalString,
        type: 'GET',
        beforeSend: function () { },
        success: function () { },
    });
};
