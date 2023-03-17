import mysql.connector
import pymysql
import requests
import json
from mysql.connector import errorcode
from bs4 import BeautifulSoup


def listaPromocoes():
    con = mysql.connector.connect(
        host="localhost", user="root", password="", database="ecommerce")
    c = con.cursor()
    c.execute("select pr.id_produto, prm.nome_produto, pr.nome_produto, pr.serial_produto, forn.id_fornecedor, pr.valor_produto, prm.perc_desconto from produtos pr join promocoes prm on prm.id_produto = pr.id_produto join fornecedor forn on forn.id_fornecedor = pr.id_fornecedor where pr.qtde_estoque > 1")

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
    con = mysql.connector.connect(
        host="localhost", user="root", password="", database="ecommerce")
    c = con.cursor()
    sql = "select pr.id_produto, prm.nome_produto, pr.nome_produto, pr.serial_produto, forn.id_fornecedor, pr.valor_produto, prm.perc_desconto, pr.qtde_estoque from produtos pr join promocoes prm on prm.id_produto = pr.id_produto join fornecedor forn on forn.id_fornecedor = pr.id_fornecedor where prm.id_produto = %s" % (
        id)
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
            "desconto": i[6],
            "estoque": i[7]
        }
        contador = contador + 1

    converter = json.dumps(lista)
    con.close()

    return converter


def insereItensPedido(idProdutoInserido, idProduto, qtdeProduto):
    con = mysql.connector.connect(
        host="localhost", user="root", password="", database="ecommerce")
    c = con.cursor()
    sql = "insert into log_itens_pedidos (id_pedido, id_produto, qt_produto) values (%s, %s, %s)"
    values = (idProdutoInserido, idProduto, qtdeProduto)
    c.execute(sql, values)
    con.commit()
    con.close()
    return 'Fim de novo'


def ConsultaItensCart(idProdutoInserido):
    val = str(idProdutoInserido)
    con = mysql.connector.connect(host="localhost", user="root", password="", database="ecommerce")
    c = con.cursor()
    sql = "select pr.id_produto, prm.nome_produto, pr.valor_produto, prm.perc_desconto, log.qt_produto, log.id_pedido from promocoes prm join log_itens_pedidos log on prm.id_produto = log.id_produto join produtos pr on pr.id_produto = prm.id_produto where log.id_pedido = %s"
    c.execute(sql, (val,))
    #print(sql + val)

    lista = dict()
    contador = 0
    temItem = False

    for i in c.fetchall():
        temItem = True
        lista[contador] = {
            "id": i[0],
            "apelido": i[1],
            "valor": i[2],
            "desconto": i[3],
            "estoque": i[4],
            "idpedidos": i[5]
        }
        contador = contador + 1

    if temItem == False:
        print("Não tem item no carrinho!")

    converter = json.dumps(lista)
    print(converter)
    con.close()
    return converter

def removeItensPedido(idProdutoInserido, idProduto):
    val = (idProdutoInserido, idProduto)
    con = mysql.connector.connect(host="localhost", user="root", password="", database="ecommerce")
    c = con.cursor()
    sql = "delete from log_itens_pedidos where id_pedido = %s and id_produto = %s"
    c.execute(sql, val)
    con.commit()
    con.close()
    return 'Fim!'