<?php

function getSubjectsArray(/*$subjectId*/) {
	//TODO SKEGGIB : Tu ne peux pas faire ca comme ca (J'ai commenté pour eviter une erreur).
	//Crée une autre méthode "getSubjectById"
	//Et je pense que celle ci devrait juste s'appeler "GetSubjects"

	//Sinon tu fais comme dans listLinks / GetLinks

	$query = "SELECT id, name FROM subjects";
	$results = pg_query($query);

	$arr = array();
	while ($line = pg_fetch_array($results)) {
		$arr[] = array('id' => $line[0], 'name' => $line[1]);
	}

	return $arr;
}

?>