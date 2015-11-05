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
}