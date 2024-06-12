<?php
require_once('database.php');

function loginUser($username, $password) {
    $connection = getDatabaseConnection();

    try {
        // Prepara la sentencia SQL para seleccionar el usuario con la contraseña correspondiente
        $sql = "SELECT id, username FROM `user` WHERE username = :username AND pass = :password";
        $statement = $connection->prepare($sql);
        $statement->bindParam(':username', $username);
        $statement->bindParam(':password', $password);
        $statement->execute();

        // Obtiene el usuario si las credenciales son válidas
        $user = $statement->fetch(PDO::FETCH_ASSOC);

        $connection = null;

        return $user;
    } catch (PDOException $e) {
        return array('error' => $e->getMessage());
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtiene las credenciales del formulario de inicio de sesión
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Intenta autenticar al usuario
    $user = loginUser($username, $password);

    // Comprueba si el usuario fue autenticado correctamente
    if ($user) {
        // Si el usuario es autenticado, devuelve la información del usuario en formato JSON
        echo json_encode(array('status' => 'success', 'user' => $user));
    } else {
        // Si las credenciales son inválidas, devuelve un mensaje de error en formato JSON
        echo json_encode(array('status' => 'error', 'message' => 'Credenciales inválidas'));
    }
} else {
    // Si la solicitud no es de tipo POST, devuelve un mensaje de error en formato JSON
    echo json_encode(array('status' => 'error', 'message' => 'Método no permitido'));
}
?>
