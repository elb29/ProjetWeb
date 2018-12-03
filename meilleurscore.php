<?php

$link = mysqli_connect('localhost', 'root', '', 'projetweb');
mysqli_set_charset($link, "utf8");

if (!$link) {
  die('Erreur de connexion');
} else {

}

$selec = "SELECT pseudo,temps FROM scores ORDER BY temps LIMIT 1";

if ($result = mysqli_query($link, $selec)) {
 while ($ligne = mysqli_fetch_assoc($result)) {
	$score[] = $ligne;
	}
} else {
	echo "Erreur de requête de base de données.";
}


echo json_encode($score);


?>
