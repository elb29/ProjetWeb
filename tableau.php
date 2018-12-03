<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="tableau.css">
		<link rel="shortcut icon" href="images/mafieu.ico">
</head>

<body>
<div id='centrage'>

<div >


	<table id='tableau'>
		<tr>
			<td style="color:red"> Pseudo </td>
			<td style="color: red"> Score </td>
		</tr>



	<?php
	$link = mysqli_connect('localhost', 'root', '', 'projetweb');
	mysqli_set_charset($link, "utf8");


	if (!$link) {
	  die('Erreur de connexion');
	} else {

	}

	$r = "SELECT pseudo,temps FROM scores ORDER BY temps LIMIT 10" ;

	if ($result = mysqli_query($link, $r)) {
	 while ($ligne = mysqli_fetch_assoc($result)) {


		?>

		<tr>
			<td> <?php echo $ligne["pseudo"]  ?> </td>
			<td> <?php echo $ligne["temps"]  ?> </td>
		</tr>



		<?php


		}
	} else {
		echo "Erreur de requête de base de données.";
	}

	?>


</table>

</div>

<div id="bandeau">
		<div> <a href="index.html" title="acc">Retour à l'acceuil</a></div>
</div>



</div>











</body>



</html>
