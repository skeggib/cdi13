<?php

namespace CDI13\DatabaseBundle\Controller;

/**
* Représente un lien vers une page et son titre
*/
class Link
{
	private $link;
	private $name;
	private $subject_name;



	/* --- CONSTRUCTOR --- */
	
	public function __construct()
	{
		$this->url = "";
		$this->name = "";
		$this->subject_name = "";
	}



	/* --- METHODS --- */

	/*!
	 * @param string $url URL a charger
	 */
	public function load($url) {

		/* --- Get page --- */

		try {
			$temp = Tools::getUrlTitle($url);
		}
		catch (Exception $e) {
			throw new Exception("Impossible de creer le Link", e);
		}

		if ($temp == "") {
			throw new Exception("La chaine retournée par la requette est vide");
		}

		/* --- Url --- */

		$this->url = $url;

		/* --- Subject --- */

		$tempTab = explode("[", $temp);
		if (count($tempTab) > 1) {
			$temp = $tempTab[1];
			$tempTab = explode("] ", $temp);
			if (count($tempTab) > 1)
				$this->subject_name = $tempTab[0];
			else
				$this->subject_name = "default";
		}
		else
			$this->subject_name = "default";
		$this->subject_name = strtolower($this->subject_name);

		/* --- Name --- */

		$temp = explode("] ", $temp)[1];
		$this->name = explode(" - HackMD", $temp)[0];
	}

	public function toString() {
		return "[" . $this->subject_name . "] " . $this->name . " (" . $this->url . ")";
	}



	/* --- GET/SET --- */

	public function getUrl() {
		return $this->link;
	}

	public function getName() {
		return $this->name;
	}

	public function getSubjectName() {
		return $this->subject_name;
	}
}