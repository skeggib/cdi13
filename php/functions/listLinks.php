<?php

function getLinksArray($subjectId) {
	
	if ($subjectId == -1)
		$query = "SELECT id, link, name FROM links";
	else
		$query = "SELECT id, link, name FROM links WHERE subject_id=" . $subjectId;
	
	$results = pg_query(mysqli_real_escape_string($query));

	$arr = array();
	while ($line = pg_fetch_array($results)) {
		$arr[] = array('id' => $line[0], 'link' => $line[1], 'name' => $line[2]);
	}

	return $arr;
}

?>