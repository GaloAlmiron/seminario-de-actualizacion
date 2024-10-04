<?php

// Include or require the connection function path here (replace with your actual path)
require_once('database.php');

function getActions() {
  $connection = getDatabaseConnection();

  try {
    // Prepare the SQL statement to select actions
    $sql = "SELECT id, name FROM action";
    $statement = $connection->prepare($sql);

    // Execute the statement
    $statement->execute();

    // Fetch all results as an associative array
    $actions = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Close the connection
    $connection = null;

    return $actions;
  } catch (PDOException $e) {
    return array('error' => $e->getMessage());
  }
}

// Get the actions and encode as JSON
$actions = getActions();
$json = json_encode($actions);

// Set the Content-Type header to application/json
header('Content-Type: application/json');

// Print the JSON data
echo $json;

?>
