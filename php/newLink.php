<?php

/*!
 * Ajoute un lien dans la base de données.
 * Fonctionne uniquement si le fichier est appelé via une requette GET en AJAX.
 * Le lien est passé via un l'option url.
 */

include_once "functions/addLink.php";
include_once "functions/dbConnect.php";

/* AJAX check  */
//if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	
	$db = dbConnect();
	$link = addLink($_GET["url"]);

	if ($link != false) {
		$arr = array('link' => $link->getUrl(), 'name' => $link->getName(), 'subject_id' => subjectId($link->getSubject()));
		echo json_encode($arr);
	}
	else
		echo "false";

	dbClose($db);

//}

?>