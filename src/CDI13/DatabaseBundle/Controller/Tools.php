<?php

namespace CDI13\DatabaseBundle\Controller;

/**
* Tools
*/
abstract class Tools
{
	/*!
	 * Permet d'obtenir le titre d'une page web
	 * @param  string $url URL de la page web
	 * @return string      Titre de la page web
	 */
	public static function getUrlTitle($url) {
		
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
}