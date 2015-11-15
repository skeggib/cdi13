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

	/*!
	 * Permet d'obtenir le Markdown d'une page HackMD
	 * @param  [type] $url [description] // TODO
	 * @return [type]      [description]
	 */
	public static function getUrlMarkdown($url) {
		try {
			$result = file_get_contents($url);
		}
		catch (Exception $e) {
			throw new Exception("Impossible de charger la page " . $url, $e);
		}

		// Si la page contient le bouton "Publish"
		if (ereg("\<a .+ class=.ui\-publish", $result)) {
			$result = file_get_contents($url . "/publish");
		}

		$markdown = explode('<div id="doc" class="container markdown-body">', $result)[1];
		$markdown = explode('</div>', $markdown)[0];

		return $markdown;
	}
}