<?php
$link = mysqli_connect('localhost', 'my_userroot', '', 'scores');

if (!$link) {
  die('Erreur de connexion');
} else {
  echo 'Succès... ';
}

$sql_1 = "CREATE TABLE `score` (
	`id` int(3) NOT NULL,
	`nom` text,
	`prenom` text,
	`temps` float);
  
  INSERT INTO `score` (`id`, `nom`, `prenom`, `temps`) VALUES
  (1, 'joueur', 'premier', 0),
  (2,'joueur', 'deuxieme', 0), 
  (3, 'joueur', 'troisieme', 0);
  
  ";
  
mysqli_query($link, $sql_1);


if($_POST['type']== 'affichage'){

	$selec = "SELECT nom,prenom FROM score WHERE min(temps)";

    echo json_encode($select);
}




?>