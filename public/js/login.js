// Variáveis:
var telaLogin = document.querySelector('.screen-login');
var telaCadastro = document.querySelector('.registration-screen');
var botaoFechaLogin = document.querySelector('.close-screen-login');
var botaoFinalizarCompra = document.querySelector('#checkout_button');
var linkCadastrar = document.querySelector('#link-cadastrar');
var linkLogin = document.querySelector('#link-login');
var linkCadastro = document.querySelector('#link-cadastro');
var linkEntrar = document.querySelector('#link-entrar');
var botaoFechaCadastro = document.querySelector('.close-screen-registration');
var botaoEnviaPedido = document.querySelector('#checkout_button');
var botaoValidaLogin = document.querySelector('.btn-valida-login');
var logado = false;

// Eventos de Clique:
botaoFechaLogin.addEventListener('click', () => {
    telaLogin.style.display = 'none';
});

botaoFechaCadastro.addEventListener('click', () => {
    telaCadastro.style.display = 'none';
});

linkCadastrar.addEventListener('click', () => {
    telaLogin.style.display = 'none';
    telaCadastro.style.display = 'block';
});

linkCadastro.addEventListener('click', () => {
    telaCadastro.style.display = 'block';
});

linkLogin.addEventListener('click', () => {
    telaCadastro.style.display = 'none';
    telaLogin.style.display = 'block';
});

linkEntrar.addEventListener('click', () => {
    telaLogin.style.display = 'block';
});

function cliqueBotaoEnvia() {
    var email = document.querySelector('#login-email').value;
    var senha = document.querySelector('#login-senha').value;
    validaLogin(email, senha);
    if (logado == false) {
        telaLogin.style.display = 'block';
        telaComprasItens.style.display = 'none';
    }
    if (logado == true) {
        console.log('Pedido CONFIRMADO!')
    };
};

function validaLogin(email, senha) {

    fetch('http://d06a0002n.dfs.local:8000/api/ecommerce/login/' + email + '/' + senha)
        .then(response => {
            if (!response.ok) {
                throw new Error('Deu erro!');
            }
            return response.json();
        })
        .then(data => {

            var mensagem = document.querySelector('#text-confirm-login');
            var nomePagina = document.querySelector('#nome-pagina p');
            var c = document.querySelector('.login-cart-body');

            logado = Object.keys(data).length;

            if (logado == 1) {
                nomePagina.innerHTML = 'Olá! ' + data[0]['nome'];
                telaLogin.style.display = 'none';
                c.innerHTML = '';
                logado = true;
            } else {
                console.log("DEU ERRO")
                mensagem.style.display = 'block';
                setTimeout(() => {
                    mensagem.style.display = 'none';
                    document.querySelector('#login-email').value = '';
                    var senha = document.querySelector('#login-senha').value = '';
                }, 2500);
            };
        });
};