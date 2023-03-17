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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)