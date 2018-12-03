<?php
$link = mysqli_connect('localhost', 'root', '', 'projetweb');
mysqli_set_charset($link, "utf8");


if (!$link) {
  die('Erreur de connexion');
} else {
  echo 'Succès... ';
}

$t = $_POST["temps"] ;
$p = $_POST["pseudo"];


$r = "INSERT INTO scores(pseudo, temps) VALUES ('$p',time('$t'))" ;


echo mysqli_query($link, $r);


?>
