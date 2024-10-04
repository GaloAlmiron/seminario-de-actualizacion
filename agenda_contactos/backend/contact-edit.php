<?php

  include('database.php');

if(isset($_POST['id'])) {
  $contact_name = $_POST['name']; 
  $contact_surname = $_POST['surname'];
  $contact_adress = $_POST['adress'];
  $contact_email = $_POST['email'];
  $contact_tel = $_POST['tel'];
  $id = $_POST['id'];
  $query = "UPDATE contact SET name = '$contact_name', surname = '$contact_surname', adress = '$contact_adress', email = '$contact_email', tel = '$contact_tel' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "Contact Update Successfully";  

}

?>
