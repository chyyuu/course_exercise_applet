<?php 
	require_once('database.php');
       	$db=db_connect();

	$query="SELECT * FROM test WHERE end > now() AND begin < now()";  
    	$result = $db->query($query);  
    	$len= mysqli_affected_rows($db); 

	$json = array();
	for($i=0; $i<$len; $i++){
		$row = $result->fetch_assoc();
		$json[$i] = array("id"=>$row['id'],"begin"=>$row['begin'],"end"=>$row['end']);
	}
    	$db->close();   
	echo json_encode($json);
?>