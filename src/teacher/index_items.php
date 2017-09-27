<?php 
	$type = $_GET['type'];

	require_once('database.php');
       	$db=db_connect();
	$db->query("set character set 'utf8'");

	$query="SELECT * FROM item WHERE type='".$type."'";  
    	$result = $db->query($query);  
    	$len= mysqli_affected_rows($db); 
	$json = array();
    	for($i=0; $i<$len; $i++){ 
		$row = $result->fetch_assoc();
        	$json[$row['q_number']] = $row['question'];  
    	} 
    	$db->close();   

	$json_obj = json_encode($json);
	echo $json_obj;
?>