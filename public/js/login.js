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
var nome = '';

// Eventos de Clique:
botaoFechaLogin.addEventListener('click', () => {
    telaLogin.style.display = 'none';
});

botaoFechaCadastro.addEventListener('click', () => {
    telaCadastro.style.display = 'none';
});

linkCadastro.addEventListener('click', () => {
    telaCadastro.style.display = 'block';
});

linkEntrar.addEventListener('click', () => {
    telaLogin.style.display = 'block';
});

linkCadastrar.addEventListener('click', () => {
    telaLogin.style.display = 'none';
    telaCadastro.style.display = 'block';
});

linkLogin.addEventListener('click', () => {
    telaCadastro.style.display = 'none';
    telaLogin.style.display = 'block';
});

function cliqueValidaLogin() {
    const form = document.getElementById('form-login');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var email = document.querySelector('#login-email').value;
        var senha = document.querySelector('#login-senha').value;

        validaLogin(email, senha);

        setTimeout(() => {
            console.log(logado)

            if (logado == true) {
                telaLogin.style.display = 'none';
                location.reload()
            };
        }, 500)
    });
}

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
                nome = data[0]['nome'];
                logado = true;

                var tempo = new Date();
                tempo.setTime(tempo.getTime() + (7 * 24 * 60 * 60 * 1000));
                var expires = "expires=" + tempo;
                var name = "Login=" + nome + ";";
                document.cookie = name + expires + "; path=/";
            } else {
                mensagem.style.display = 'block';
                setTimeout(() => {
                    mensagem.style.display = 'none';
                    document.querySelector('#login-email').value = '';
                    var senha = document.querySelector('#login-senha').value = '';
                }, 2500);
            };
        });
};

function enviaCadastro(nome, email, senha, rua, bairro, cidade, estado) {

    console.log('http://localhost:8000/api/ecommerce/cadastro/' + nome + '/' + email + '/' + senha + '/' + rua + '/' + bairro + '/' + cidade + '/' + estado)
    fetch('http://localhost:8000/api/ecommerce/cadastro/' + nome + '/' + email + '/' + senha + '/' + rua + '/' + bairro + '/' + cidade + '/' + estado, {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) { } else { }
        })
}

function cliqueEnviaCadastro() {

    const d = (el) => document.querySelector(el);

    var nomeUsuario = d('#input-nome-completo').value;
    var nome = nomeUsuario.toLowerCase().replace(/(?:^|\s)\S/g, function (letra) {
        return letra.toUpperCase();
    });
    var emailUsuario = d('#input-campo-email').value;
    var email = emailUsuario.toLowerCase();
    var senha = d('#input-senha').value;
    var ruaUsuario = d('#input-campo-rua').value;
    var rua = ruaUsuario.toLowerCase().replace(/(?:^|\s)\S/g, function (letra) {
        return letra.toUpperCase();
    });
    var bairroUsuario = d('#input-campo-bairro').value;
    var bairro = bairroUsuario.toLowerCase().replace(/(?:^|\s)\S/g, function (letra) {
        return letra.toUpperCase();
    });
    var cidadeUsuario = d('#input-campo-cidade').value;
    var cidade = cidadeUsuario.toLowerCase().replace(/(?:^|\s)\S/g, function (letra) {
        return letra.toUpperCase();
    });
    var estado = d('#input-campo-estado').value;

    enviaCadastro(nome, email, senha, rua, bairro, cidade, estado);

    var data = new Date();
    data.setTime(data.getTime() + (7 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + data;
    var name = "Login=" + nome + ";";
    document.cookie = name + expires + "; path=/";


    telaCadastro.style.display = 'none';
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
        window.location = "finalizarpedido.php";
    } else {
        telaLogin.style.display = 'block';
        telaComprasItens.style.display = 'none';
    }
};