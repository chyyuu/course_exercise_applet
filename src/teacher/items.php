<?php 
	$id = $_GET['id'];
	$json = array();
	$i=0;

	require_once('database.php');
       	$db=db_connect();

	$query="SELECT * FROM test WHERE id=".$id;  
    	$result = $db->query($query);  
	$row = $result->fetch_assoc();

	$i=0;
	$single = (array)json_decode($row['single'],true);
	foreach($single as $value){
		$json['single'][$i] =  file_get_contents("json/".$value.".json");
		$i=$i+1;
	}
	$i=0;
	$multi = (array)json_decode($row['multi'],true);
	foreach($multi as $value){
		$json['multi'][$i] =  file_get_contents("json/".$value.".json");
		$i=$i+1;
	}
	$i=0;
	$true_false = (array)json_decode($row['true_false'],true);
	foreach($true_false as $value){
		$json['true_false'][$i] =  file_get_contents("json/".$value.".json");
		$i=$i+1;
	}
	$i=0;
	$fill = (array)json_decode($row['fill'],true);
	foreach($fill as $value){
		$json['fill'][$i] =  file_get_contents("json/".$value.".json");
		$i=$i+1;
	}

    	$db->close();   
	
	echo json_encode($json);
?>