<?php 

function searchLinks($searchString) {

	$str = strtolower($searchString);
	$tab = explode(" ", $str);

	$query = "SELECT links.id, links.link, links.name, subjects.name FROM links JOIN subjects ON links.subject_id = subjects.id WHERE ";

	for ($i = 0; $i < count($tab); $i++) {
		if ($i != 0)
			$query .= " OR ";
		$query .= "LOWER(links.name) LIKE '%" . pg_escape_string($tab[$i]) . "%'";
	}

	if ($i > 0)
		$query .= " OR ";

	for ($i = 0; $i < count($tab); $i++) {
		if ($i != 0)
			$query .= " OR ";
		$query .= "LOWER(subjects.name) LIKE '%" . pg_escape_string($tab[$i]) . "%'";
	}


	$results = pg_query($query);

	$arr = array();
	while ($line = pg_fetch_array($results)) {
		$arr[] = array('id' => $line[0], 'link' => $line[1], 'name' => $line[2], 'subject_name' => $line[3]);
	}

	return $arr;
}

 ?>