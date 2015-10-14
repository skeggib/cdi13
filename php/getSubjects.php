<?php

/*!
 * Renvoi une liste de cours correspondants à un cours.
 * Fonctionne uniquement si le fichier est appelé via une requette GET en AJAX.
 * L'ID di cours est passé via l'option subject.
 */

include_once "functions/listSubjects.php";
include_once "functions/dbConnect.php";

/* AJAX check  */
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	
	$db = dbConnect();
	$arr = getSubjectsArray();
	dbClose($db);

	if (count($arr) == 0)
		echo "false";
	else
		echo json_encode($arr);
}

?>