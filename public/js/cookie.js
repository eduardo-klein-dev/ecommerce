var session = $('#sessionID').val();
var btnCookie = document.querySelector('#btn-aceita-cookie');
var telaCookie = document.querySelector('.cookie');

function consultaCookie(session) {
    fetch('http://localhost:8000/api/ecommerce/consultacookie/' + session)
        .then(response => {
            if (!response.ok) {};
            return response.json();
        })
        .then(data => {

            var quantosItens = Object.keys(data).length;

            if (quantosItens > 0) {
                json[i].status == 'SIM';
            } else {
                criaCookie(session);
            };
        });
};

function criaCookie(session) {
    fetch('http://localhost:8000/api/ecommerce/cookie/' + session, {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) {
            } else { }
        })
};

function alteraCookie(session) {
    fetch('http://localhost:8000/api/ecommerce/alteracookie/' + session, {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) {
            } else { }
        })
};

function cliqueAlteraCookie() {
    alteraCookie(session);
    console.log(telaCookie);
    telaCookie.style.display = 'none'
}