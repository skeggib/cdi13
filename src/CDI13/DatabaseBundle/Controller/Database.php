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
}