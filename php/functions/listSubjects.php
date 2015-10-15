<?php

function getSubjectsArray() {
	$query = "SELECT id, name FROM subjects";
	$results = pg_query($query);

	$arr = array();
	while ($line = pg_fetch_array($results)) {
		$arr[] = array('id' => $line[0], 'name' => $line[1]);
	}

	return $arr;
}

?>