<?php

require_once "connect.php";

$connection= @new mysqli($host,$db_user,$db_password,$db_name);
$connection -> set_charset("utf8");
if($connection->connect_errno){
    echo "Error: ".$connection->connect_errno."<br/>"."Desription: ".$connection->connect_error;
}

$quote = trim(htmlspecialchars($_REQUEST['quote']));
$author= trim(htmlspecialchars($_REQUEST['author']));

$name = substr($author,0, strrpos($author, ' '));
$surname=substr($author,strrpos($author, ' ')+1,strlen($author) - strlen($name));

$resultOfQuery=0;

$teacherid=getTeacherId($name,$surname, $connection);

if($teacherid==0){
  $insertTeacher = sprintf("INSERT INTO `teachers` (`id`, `imie`, `nazwisko`) VALUES (NULL, '%s','%s')", $name,$surname);
  $connection->query($insertTeacher);
  $teacherid=getTeacherId($name,$surname, $connection);
  }

$insertQuote = sprintf("INSERT INTO `quotes` (`id`, `teacherid`, `quote`) VALUES (NULL, %d,'%s')", $teacherid, $quote);
  $connection->query($insertQuote);


$connection->close();

function getTeacherId($nam, $snam, &$con){
  $id=0;
  $getTeacherIdQuery = sprintf("SELECT id FROM teachers WHERE imie='%s' AND nazwisko='%s'", $nam,$snam);
  if($resultOfQuery = @$con->query($getTeacherIdQuery)){
    $numberOfRows = $resultOfQuery->num_rows;
      $row = $resultOfQuery->fetch_assoc();
      $id=$row['id'];
      $resultOfQuery->free();
  }
  return $id;
}

 ?>
