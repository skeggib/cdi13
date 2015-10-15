<?php

/*!
 * Renvoi une liste de cours correspondants une recherche.
 * Fonctionne uniquement si le fichier est appelé via une requette GET en AJAX.
 * Le string de recherche est passé via l'option search_string.
 * Si search_string est vide ou n'existe pas, false sere renvoyé.
 */

include_once "functions/searchLinks.php";
include_once "functions/dbConnect.php";

/* AJAX check  */
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	
	$db = dbConnect();

	if (isset($_GET["search_string"]) && $_GET["search_string"] != "")
		$arr = searchLinks($_GET["search_string"]);
	else
		$arr = null;

	dbClose($db);

	if (count($arr) == 0)
		echo "false";
	else
		echo json_encode($arr);
}

?>