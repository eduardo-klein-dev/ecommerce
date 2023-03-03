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
    c.execute("select pr.id_produto, prm.nome_produto, pr.valor_produto from promocoes prm join produtos pr where prm.id_produto = pr.id_produto")
    
    lista = dict()
    contador = 0

    for i in c.fetchall():
        lista[contador] = {
            "id":i[0],
            "produto":i[1],
            "valor":i[2]
        }
        contador = contador + 1
    
    converter = json.dumps(lista)
    con.close()
    
    return converter