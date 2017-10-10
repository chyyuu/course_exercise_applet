<?php
	error_reporting(0);
	$course = $_POST["course"];
	require_once('database.php');
       	$db=db_connect();
	$db->query("set names 'utf8'");//写库 

       	$query="select knowledge from item where course='".$course."' group by knowledge;";
       	$result = $db->query($query);
    	$len= mysqli_affected_rows($db); 
	$json = array();
	for($i=0; $i<$len; $i++){
		$row = $result->fetch_assoc();
		$json[$i] =$row['knowledge'];
	}
    	$db->close();   
	echo json_encode($json);
?>
