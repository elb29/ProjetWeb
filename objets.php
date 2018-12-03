<?php
	$link = mysqli_connect('localhost', 'root', '', 'projetweb');
	mysqli_set_charset($link, "utf8"); 

	if (!$link) {
		die('Erreur de connexion');
	} else {

	}

	if (isset($_GET['id'])) {
		$id = $_GET['id'];
		$r = "SELECT * FROM objets WHERE id=" . $id;

	}
	else {
		$r = "SELECT * FROM objets WHERE cgmt_debut=" . "1";
	}


	if ($result = mysqli_query($link, $r)) {
	 while ($ligne = mysqli_fetch_assoc($result)) {
	 	$objets[] = $ligne;
 		}
	} else {
	 	echo "Erreur de requête de base de données.";
 	}
	 	echo json_encode($objets,JSON_NUMERIC_CHECK);
?>
