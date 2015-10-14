<?php

/*!
 * Permet d'obtenir le titre d'une page web
 * @param  string $url URL de la page web
 * @return string      Titre de la page web
 */
function getUrlTitle($url) {
	
	try {
		$result = file_get_contents($url);
	}
	catch (Exception $e) {
		throw new Exception("Impossible de charger la page " . $url, $e);
	}

	$title = explode("<title>", $result)[1];
	$title = explode("</title>", $title)[0];
	return $title;
}

/**
* Représente un lien vers une page et son titre
*/
class Link
{
	private $url;
	private $name;
	private $subject;



	/* --- CONSTRUCTOR --- */
	
	public function __construct()
	{
		$this->url = "";
		$this->name = "";
		$this->subject = "";
	}



	/* --- METHODS --- */

	/*!
	 * @param string $url URL a charger
	 */
	public function create($url) {

		/* --- Get page --- */

		try {
			$temp = getUrlTitle($url);
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
				$this->subject = $tempTab[0];
			else
				$this->subject = "default";
		}
		else
			$this->subject = "default";
		$this->subject = strtolower($this->subject);

		/* --- Name --- */

		$temp = explode("] ", $temp)[1];
		$this->name = explode(" - HackMD", $temp)[0];
	}

	public function toString() {
		return "[" . $this->subject . "] " . $this->name . " (" . $this->url . ")";
	}



	/* --- GET/SET --- */

	public function getUrl() {
		return $this->url;
	}

	public function getName() {
		return $this->name;
	}

	public function getSubject() {
		return $this->subject;
	}
}

?>
