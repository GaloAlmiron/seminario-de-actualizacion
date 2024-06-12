<?php
require_once('database.php');

function getGroups() {
  $connection = getDatabaseConnection();

  try {
    // Prepara la sentencia SQL para seleccionar los grupos con sus acciones correspondientes
    $sql = "
      SELECT g.id, g.name AS group_name, a.name AS action_name
      FROM `group` g
      LEFT JOIN `group_action` ga ON g.id = ga.id_group
      LEFT JOIN `action` a ON ga.id_action = a.id
    ";
    $statement = $connection->prepare($sql);

    // Ejecuta la sentencia
    $statement->execute();

    // Obtiene todos los resultados como un array asociativo
    $groups = $statement->fetchAll(PDO::FETCH_ASSOC);

    $connection = null;

    return $groups;
  } catch (PDOException $e) {
    return array('error' => $e->getMessage());
  }
}

// Obtiene los grupos y los codifica como JSON
$groups = getGroups();
$json = json_encode($groups);

header('Content-Type: application/json');

echo $json;

?>
