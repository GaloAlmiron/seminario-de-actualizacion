<?php

require_once('database.php');

function addUser($username, $password, $groupId) {
    $connection = getDatabaseConnection();

    try {
        // Inicia una transacción
        $connection->beginTransaction();

        // Inserta el usuario en la tabla `user`
        $sql = "INSERT INTO `user` (username, pass) VALUES (:username, :password)";
        $statement = $connection->prepare($sql);
        $statement->bindParam(':username', $username);
        $statement->bindParam(':password', $password);
        $statement->execute();

        // Obtiene el ID del usuario insertado
        $userId = $connection->lastInsertId();

        // Inserta la relación en la tabla `user_group`
        $sql = "INSERT INTO `user_group` (id_user, id_group) VALUES (:user_id, :group_id)";
        $statement = $connection->prepare($sql);
        $statement->bindParam(':user_id', $userId);
        $statement->bindParam(':group_id', $groupId);
        $statement->execute();

        // Confirma la transacción
        $connection->commit();

        return array('status' => 'success');
    } catch (PDOException $e) {
        // Revierte la transacción en caso de error
        $connection->rollBack();
        return array('status' => 'error', 'message' => $e->getMessage());
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $groupId = $_POST['group'];

    $response = addUser($username, $password, $groupId);
    echo json_encode($response);
}

?>
