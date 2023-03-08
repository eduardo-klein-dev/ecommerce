<?php
require 'conexao_bd.php';

class Servicos
{
    private $conexao;

    public function __construct()
    {
        $conn = new Conexao();
        $this->conexao = $conn->conectar();
    }

    public function InsertItemPedido($idProdutoInserido, $idProduto, $qtdeProduto)
    {

        $idProdutoInserido = $_POST['idProdutoInserido'];
        $idProduto = $_POST['idProduto'];
        $qtdeProduto = $_POST['qtdeProduto'];

        $sql = "insert into log_itens_pedidos (id_pedido, id_produto, qt_produto) values (':idProdutoInserido', :idProduto, :qtdeProduto)";

        $stmt = $this->conexao->prepare($sql);
        $stmt->bindParam(':idProdutoInserido', $idProdutoInserido);
        $stmt->bindParam(':idProduto', $idProduto);
        $stmt->bindParam(':qtdeProduto', $qtdeProduto);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
        echo $stmt->execute();
    }
}
