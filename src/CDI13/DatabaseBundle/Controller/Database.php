<?php

namespace CDI13\DatabaseBundle\Controller;

/**
* 
*/
class Database
{
	/* --- ATTRIBUTS --- */

	private $db;




	/* --- CONSTRUCTOR / DESCTRUCTOR --- */
	
	public function __construct() {
		$this->db = pg_connect("host=localhost dbname='cdi13' user='cdi13' password='cdi13database'");
	}

	public function __destruct() {
		pg_close($this->db);
	}




	/* --- METHODS --- */

	/*!
	 * Retourne la liste des subjects
	 * @return String           La liste des subjects au format JSON ou "false" en cas d'erreur
	 */
	public function getSubjects() {
		$error_return = "false";

		$query = "SELECT id, full_name FROM subject";
		try {
			$results = pg_query($query);
		}
		catch (Exception $e) {
			return $error_return;
		}

		$arr = array();
		while ($line = pg_fetch_array($results)) {
			$arr[] = array('id' => $line[0], 'name' => $line[1]);
		}

		if (count($arr) == 0)
			return $error_return;
		else
			return json_encode($arr);
	}

	/*!
	 * Retourne une list de links correspondants a un subject
	 * @param  int $subject_id ID du subject
	 * @return String           La liste des links au format JSON ou "false" en cas d'erreur
	 */
	public function getLinks($subject_id) {
		if ($subject_id == -1)
			$query = "SELECT id, link, name FROM link";
		else
			$query = "SELECT id, link, name FROM link WHERE subject_id=" . pg_escape_string($subject_id);
		
		$results = pg_query($query);

		$arr = array();
		while ($line = pg_fetch_array($results)) {
			$arr[] = array('id' => $line[0], 'link' => $line[1], 'name' => $line[2]);
		}

		if (count($arr) == 0)
			return "false";
		else
			return json_encode($arr);
	}

	public function getMarkdown($link_id) {
		if ($link_id <= 0) {
			return "false";
		}

		$max_timestamp_diff = 60; // Après combien de temps le markdown est obsolète (en secondes)

		// Recuperer le dernier Markdown de la BDD
		$query = "
					SELECT markdown, creation_timestamp 
					FROM markdown 
					WHERE 
						link_id=" . $link_id ."
						AND creation_timestamp=(SELECT MAX(creation_timestamp) FROM markdown WHERE link_id=" . $link_id . ")
		";
		$results = pg_query($query);
		if ($line = pg_fetch_array($results)) {

			// Verifier si le dernier MD est trop vieux
			$last_md_time = strtotime($line[1]);
			$diff = time() - $last_md_time;

			// Si le markdown n'est pas obsolète, on le retourne
			if ($diff < $max_timestamp_diff)
				return $line[0];
		}

		// Si le markdown est obsolète
		// Recuperer l'URL demandé
		$query = "SELECT link FROM link WHERE id=" . $link_id;
		$results = pg_query($query);
		if ($line = pg_fetch_array($results))
			$url = $line[0];
		else
			throw new Exception("Ce lien n'existe pas");

		// Recuperer le markdown à partir du lien
		try {
			$markdown = Tools::getUrlMarkdown($url);
		}
		catch (Exception $e) {
			return "false";
		}
			
		// Insérer le markdown dans la BDD
		$query = "INSERT INTO markdown(link_id, markdown) VALUES(" . $link_id . ", '" . $markdown . "')";
		pg_query($query);

		return $markdown;
	}

	public function searchLinks($search_string) {
		$str = strtolower($search_string);
		$tab = explode(" ", $str);

		$query = "SELECT link.id, link.link, link.name, subject.full_name FROM link JOIN subject ON link.subject_id = subject.id WHERE ";

		for ($i = 0; $i < count($tab); $i++) {
			if ($i != 0)
				$query .= " OR ";
			$query .= "LOWER(link.name) LIKE '%" . pg_escape_string($tab[$i]) . "%'";
		}

		if ($i > 0)
			$query .= " OR ";

		for ($i = 0; $i < count($tab); $i++) {
			if ($i != 0)
				$query .= " OR ";
			$query .= "LOWER(subject.full_name) LIKE '%" . pg_escape_string($tab[$i]) . "%'";
		}


		$results = pg_query($query);

		$arr = array();
		while ($line = pg_fetch_array($results)) {
			$arr[] = array('id' => $line[0], 'link' => $line[1], 'name' => $line[2], 'subject_name' => $line[3]);
		}

		if (count($arr) == 0)
			return "false";
		else
			return json_encode($arr);
	}

	/*!
	 * Retourne l'id d'un sujet a partir de son short_nom
	 * @param  string $subjectName short_name du sujet
	 */
	private function subjectId($subjectName) {

		$query = "SELECT id FROM subject WHERE short_name='" . pg_escape_string($subjectName) . "'";
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
	private function addSubject($subjectName) {
		
		$query = "INSERT INTO subject(full_name, short_name) VALUES('" . pg_escape_string($subjectName) . "', '" . pg_escape_string($subjectName) . "')";
		pg_query($query);

		return $this->subjectId($subjectName);
	}

	/*!
	 * Ajoute un lien a la BDD
	 * @param string $url        URL
	 * @param int $semesterId ID du semestre
	 * @return 	Un objet Link en cas de succes ou false en cas d'echec
	 */
	public function addLink($url) {
		$link = new Link();
		
		// On tente de charger le lien
		try {
			$link->load($url);
		}
		catch (Exception $e) {
			return "false";
		}

		/* --- Database --- */


		$subjectId = $this->subjectId($link->getSubjectName());

		if ($subjectId == false)
			$subjectId = $this->addSubject($link->getSubjectName());

		$query = "INSERT INTO link(link, name, subject_id) VALUES($$" . pg_escape_string($link->getUrl()) . "$$, $$" . pg_escape_string($link->getName()) . "$$, " . pg_escape_string($subjectId) . ")";

		try {
			pg_query($query);
		}
		catch (Exception $e) {
			return "false";
		}

		if ($link != false) {
			$arr = array('link' => $link->getUrl(), 'name' => $link->getName(), 'subject_id' => $this->subjectId($link->getSubjectName()));
			return json_encode($arr);
		}
		else
			return "false";

		dbClose($db);
	}
}