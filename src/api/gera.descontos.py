from flask import Flask
from flask_cors import CORS
import conexao as svc

app = Flask(__name__)
cors = CORS(app, resources={r"/api/": {"origins": ""}})

@app.route('/api/ecommerce/promotionsnew', methods=['GET'])
def svcProdutosPromo():
    return svc.listaPromocoes()
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)