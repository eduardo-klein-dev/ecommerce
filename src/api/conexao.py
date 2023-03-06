import mysql.connector
import pymysql
import json
from mysql.connector import errorcode


# Abrimos uma conexão com o banco de dados:
#db_connection = mysql.connector.connect(host="localhost", user="root", password="", database="ecommerce")

# Cria um cursor:
# cursor = db_connection.cursor()


def listaPromocoes():
    con = mysql.connector.connect(host="localhost", user="root", password="", database="ecommerce")
    c = con.cursor()
    c.execute("select pr.id_produto, prm.nome_produto, pr.nome_produto, pr.serial_produto, forn.id_fornecedor, pr.valor_produto, prm.perc_desconto from produtos pr join promocoes prm on prm.id_produto = pr.id_produto join fornecedor forn on forn.id_fornecedor = pr.id_fornecedor")
    
    lista = dict()
    contador = 0

    for i in c.fetchall():
        lista[contador] = {
            "id": i[0],
            "apelido": i[1],
            "produto": i[2],
            "serial": i[3],
            "fornecedor": i[4],
            "valor": i[5],
            "desconto": i[6]
        }
        contador = contador + 1
    
    converter = json.dumps(lista)
    con.close()
    
    return converter

def listaItens(id):
    print('PARAMETRO SQL ID: '+str(id))
    con = mysql.connector.connect(host="localhost", user="root", password="", database="ecommerce")
    c = con.cursor()
    sql = "select pr.id_produto, prm.nome_produto, pr.nome_produto, pr.serial_produto, forn.id_fornecedor, pr.valor_produto, prm.perc_desconto from produtos pr join promocoes prm on prm.id_produto = pr.id_produto join fornecedor forn on forn.id_fornecedor = pr.id_fornecedor where prm.id_produto = %s" % (id)
    #params = (str(id))
    c.execute(sql)
    
    lista = dict()
    contador = 0

    for i in c.fetchall():
        lista[contador] = {
            "id": i[0],
            "apelido": i[1],
            "produto": i[2],
            "serial": i[3],
            "fornecedor": i[4],
            "valor": i[5],
            "desconto": i[6]
        }
        contador = contador + 1
    
    converter = json.dumps(lista)
    con.close()
    
    return converter
