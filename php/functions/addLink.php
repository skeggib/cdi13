<?php

include_once "link.php";
include_once "dbConnect.php";

/*!
 * Retourne l'id d'un sujet a partir de son short_nom
 * @param  string $subjectName short_name du sujet
 */
function subjectId($subjectName) {

	$query = "SELECT id FROM subjects WHERE short_name='" . pg_escape_string($subjectName) . "'";
	$results = pg_query($query);

	if ($line = pg_fetch_array($results))
		return $line[0];

	return false;
}

/*!
 * Ajoute le sujet a la BDD
 * @param string $subjectName Nom du sujet
 * @param int $semesterId  ID du semestre du sujet
 */
function addSubject($subjectName) {
	
	$query = "INSERT INTO subjects(name, short_name) VALUES('" . pg_escape_string($subjectName) . "', '" . pg_escape_string($subjectName) . "')";
	pg_query($query);

	return subjectId($subjectName);
}

/*!
 * Ajoute un lien a la BDD
 * @param string $url        URL
 * @param int $semesterId ID du semestre
 * @return 	Un objet Link en cas de succes ou false en cas d'echec
 */
function addLink($url) {
	$link = new Link();
	
	try {
		$link->create($url);
	}
	catch (Exception $e) {
		return false;
	}

	/* --- Database --- */


	$subjectId = subjectId($link->getSubject());

	if ($subjectId == false)
		$subjectId = addSubject($link->getSubject());

	$query = "INSERT INTO links(link, name, subject_id) VALUES($$" . pg_escape_string($link->getUrl()) . "$$, $$" . pg_escape_string($link->getName()) . "$$, " . pg_escape_string($subjectId) . ")";

	try {
		pg_query($query);
	}
	catch (Exception $e) {
		return false;
	}

	return $link;
}

?>
