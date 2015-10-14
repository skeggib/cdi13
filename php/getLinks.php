<?php

/*!
 * Renvoi une liste de cours correspondants à un cours.
 * Fonctionne uniquement si le fichier est appelé via une requette GET en AJAX.
 * L'ID di cours est passé via l'option subject.
 * Si l'ID est égal à -1, tout les cours sont renvoyés.
 */

include_once "functions/listLinks.php";
include_once "functions/dbConnect.php";

/* AJAX check  */
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	
	$db = dbConnect();

	if (isset($_GET["subject_id"]))
		$arr = getLinksArray($_GET["subject_id"]);
	else
		$arr = getLinksArray(-1);

	dbClose($db);

	if (count($arr) == 0)
		echo "false";
	else
		echo json_encode($arr);
}

?>