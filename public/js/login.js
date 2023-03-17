var telaLogin = document.querySelector('.screen-login');
var telaCadastro = document.querySelector('.registration-screen');
var botaoFechaLogin = document.querySelector('.close-screen-login');
var botaoFinalizarCompra = document.querySelector('#checkout_button');
var linkCadastrar = document.querySelector('#link-cadastrar');
var linkLogin = document.querySelector('#link-login');
var linkCadastro = document.querySelector('#link-cadastro');
var linkEntrar = document.querySelector('#link-entrar');
var botaoFechaCadastro = document.querySelector('.close-screen-registration');

botaoFechaLogin.addEventListener('click', () => {
    telaLogin.style.display = 'none';
});

botaoFechaCadastro.addEventListener('click', () => {
    telaCadastro.style.display = 'none';
});

botaoFinalizarCompra.addEventListener('click', () => {
    telaLogin.style.display = 'block';
    telaComprasItens.style.display = 'none';
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

var BotaoEnviaPedido = document.querySelector('#checkout_button');
var logado = false; 

function cliqueBotaoEnvia() {
    BotaoEnviaPedido.addEventListener('click', () => {
        if (logado == false) {
            
        };
    });
};