<?php

$host = "localhost";
$user = "root";
$pass = "";
$db = "agenda";

$connection = new mysqli($host, $user, $pass, $db);
if ($connection->connect_error) {
    die("Error de conexión a la base de datos: " . $connection->connect_error);
}

