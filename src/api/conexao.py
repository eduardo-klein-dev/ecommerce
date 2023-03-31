from flask import Flask
from flask import request
from flask_cors import CORS
import servicos as svc

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api/ecommerce/promotionsnew/', methods=['GET'])
def svcProdutosPromo():
    return svc.listaPromocoes()


@app.route('/api/ecommerce/promotionsnew/<int:id>', methods=['GET'])
def svcProdutosPromoItens(id):
    return svc.listaItens(format(id))


@app.route('/api/ecommerce/enviaitempedido/<string:idProdutoInserido>/<int:idProduto>/<int:qtdeProduto>/', methods=['PUT', 'GET', 'POST'])
def svcProdutosPedido(idProdutoInserido, idProduto, qtdeProduto):
    return svc.insereItensPedido(idProdutoInserido, format(idProduto), format(qtdeProduto))


@app.route('/api/ecommerce/consultacart/<string:idProdutoInserido>', methods=['GET'])
def svcConsultaItensCart(idProdutoInserido):
    return svc.ConsultaItensCart(idProdutoInserido)


@app.route('/api/ecommerce/removeitempedido/<string:idProdutoInserido>/<int:idProduto>/', methods=['POST'])
def svcRemoveProdutosPedido(idProdutoInserido, idProduto):
    return svc.removeItensPedido(idProdutoInserido, format(idProduto))


@app.route('/api/ecommerce/login/<string:email>/<string:senha>', methods=['GET'])
def svcValidaLogin(email, senha):
    return svc.validaLogin(email, senha)


@app.route('/api/ecommerce/cadastro/<string:nome>/<string:email>/<string:senha>/<string:rua>/<string:bairro>/<string:cidade>/<string:estado>', methods=['PUT', 'GET', 'POST'])
def svcEnviaCadastro(nome, email, senha, rua, bairro, cidade, estado):
    return svc.enviaCadastro(nome, email, senha, rua, bairro, cidade, estado)


@app.route('/api/ecommerce/cookie/<string:session>', methods=['PUT', 'GET', 'POST'])
def svcCriaCookie(session):
    return svc.criaCookie(session)


@app.route('/api/ecommerce/consultacookie/<string:session>', methods=['GET'])
def svcConsultaCookie(session):
    return svc.consultaCookie(session)


@app.route('/api/ecommerce/alteracookie/<string:session>', methods=['PUT', 'GET', 'POST'])
def svcAlteraCookie(session):
    return svc.alteraCookie(session)


@app.route('/api/ecommerce/finalizapedido/<string:session>', methods=['GET'])
def svcFinalizaPedido(session):
    return svc.finalizaPedido(session)


@app.route('/api/ecommerce/consultaendereco/<int:idusuario>', methods=['GET'])
def svcConsultaEndereco(idusuario):
    return svc.consultaEndereco(idusuario)


@app.route('/api/ecommerce/confirmapedido/<string:session>/<int:idcliente>/<string:rua>/<string:bairro>/<string:cidade>/<string:estado>/<int:tipoentrega>/<string:formapagamento>/<int:qtdeitens>/<string:valortotal>', methods=['GET'])
def svcConfirmaPedidoFinal(session, idcliente, rua, bairro, cidade, estado, tipoentrega, formapagamento, qtdeitens, valortotal):
    return svc.confirmaPedido(session, idcliente, rua, bairro, cidade, estado, tipoentrega, formapagamento, qtdeitens, valortotal)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
