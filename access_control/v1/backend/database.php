<?php

function getDatabaseConnection() {
    try {
        $connection = new PDO('mysql:host=127.0.0.1;dbname=users_control', 'root', '');
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $connection;
    } catch (PDOException $connectionException) {
        $status = array('status' => 'db-error', 'description' => $connectionException->getMessage());
        echo json_encode($status);
        die();
    }
}
?>
