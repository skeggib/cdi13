<?php

function dbConnect() {
	$db = pg_connect("host=localhost dbname='cours_dut_info_13' user='cours_dut_info_13' password='cdi13database'");
	return $db;
}

function dbClose($db) {
	pg_close($db);
}

?>
