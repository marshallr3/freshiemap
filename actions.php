<?php
$q = $_GET['q'];
echo phpinfo();
if ($q == "userEvent") {
	$data = json_decode(file_get_contents("events.json"),true);
	array_push($data, $_POST['data']);
	var_dump($data);
	file_put_contents("events.json",json_encode($data));
}else if ($q == "newUser") {
	$data = json_decode(file_get_contents("people.json"),json);
	$loc = array("lat"=>36.066307, "lng"=>-94.173854);
	array_push($data, $loc);
	var_dump($data);
	file_put_contents("people.json", "TYler");
	echo file_get_contents("people.json");
	file_put_contents("people.json", json_encode($data));
}



?>