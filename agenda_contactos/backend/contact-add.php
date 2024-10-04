<?php

  include('database.php');

if(isset($_POST['name'])) {
  $contact_name = $_POST['name'];
  $contact_surname = $_POST['surname'];
  $contact_adress = $_POST['adress'];
  $contact_email = $_POST['email'];
  $contact_tel = $_POST['tel'];
  $query = "INSERT into contact(name, surname, adress, email, tel) VALUES ('$contact_name', '$contact_surname', '$contact_adress', '$contact_email', '$contact_tel')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }

  echo "Contact Added Successfully";  

}

?>
