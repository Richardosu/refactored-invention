<?php
$dados = json_decode(file_get_contents("php://input"), true);
$nome = isset($dados["nome"]) ? $dados["nome"] : "";
$email = isset($dados["email"]) ? $dados["email"] : "";

$resposta = [
  "sucesso" => true,
  "mensagem" => "Dados recebidos com sucesso!",
  "nome" => $nome,
  "email" => $email
];

header("Content-Type: application/json");
echo json_encode($resposta);
?>