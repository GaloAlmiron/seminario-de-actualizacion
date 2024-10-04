<?php
require_once('database.php');

function getUsers() {
  $connection = getDatabaseConnection();

  try {
    // Prepara la sentencia SQL para seleccionar los usuarios con sus grupos y acciones correspondientes
    $sql = "
      SELECT u.id, u.username, u.pass, g.name AS group_name, a.name AS action_name
      FROM `user` u
      LEFT JOIN `user_group` ug ON u.id = ug.id_user
      LEFT JOIN `group` g ON ug.id_group = g.id
      LEFT JOIN `group_action` ga ON g.id = ga.id_group
      LEFT JOIN `action` a ON ga.id_action = a.id
    ";
    $statement = $connection->prepare($sql);

    $statement->execute();

    $users = $statement->fetchAll(PDO::FETCH_ASSOC);

    $connection = null;

    return $users;
  } catch (PDOException $e) {
    return array('error' => $e->getMessage());
  }
}

$users = getUsers();
$json = json_encode($users);

header('Content-Type: application/json');

echo $json;

?>
