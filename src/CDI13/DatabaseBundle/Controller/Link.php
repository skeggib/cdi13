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
			$title = Tools::getUrlTitle($url);
		}
		catch (Exception $e) {
			throw new Exception("Impossible de creer le Link", e);
		}

		if ($title == "") {
			throw new Exception("La chaine retournée par la requette est vide");
		}

		if (!$this->isTitleValid($title)) {
			throw new Exception("Le titre de la page n'est pas valide");
		}

		/* --- Url --- */

		$this->url = $url;

		/* --- Subject --- */

		$tempTab = explode("[", $title);
		if (count($tempTab) > 1) {
			$title = $tempTab[1];
			$tempTab = explode("] ", $title);
			if (count($tempTab) > 1)
				$this->subject_name = $tempTab[0];
			else
				$this->subject_name = "default";
		}
		else
			$this->subject_name = "default";
		$this->subject_name = strtolower($this->subject_name);

		/* --- Name --- */

		$title = explode("] ", $title)[1];
		$this->name = explode(" - HackMD", $title)[0];
	}

	public function toString() {
		return "[" . $this->subject_name . "] " . $this->name . " (" . $this->url . ")";
	}

	private function isTitleValid($title) {
		return preg_math("/^\[.+\] .+ \- HackMD/", $title);
	}



	/* --- GET/SET --- */

	public function getUrl() {
		return $this->url;
	}

	public function getName() {
		return $this->name;
	}

	public function getSubjectName() {
		return $this->subject_name;
	}
}