<?php

  include('database.php');

  $query = "SELECT * from contact";
  $result = mysqli_query($connection, $query);
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'name' => $row['name'],
      'surname' => $row['surname'],
      'adress' => $row['adress'],
      'email' => $row['email'],
      'tel' => $row['tel'],
      'id' => $row['id']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
?>
