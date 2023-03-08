<?php

require 'C:\xampp\htdocs\ecommerce\vendor\autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

class Conexao
{
    public function conectar()
    {
        try {

            $dsn = 'mysql:host=' . $_ENV['DB_HOST'] . ';dbname=' . $_ENV['DB_NAME'];
            $user = $_ENV['DB_USER'];
            $password = $_ENV['DB_PASSWORD'];
            $pdo = new PDO($dsn, $user, $password);

            if ($pdo) {
                echo 'CONECTADO!';
                return $pdo;
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
?>