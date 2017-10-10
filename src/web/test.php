<?php 
	require_once('database.php');
       	$db=db_connect();
	$db->query("set character set 'utf8'");//读库

	$query="SELECT * FROM test WHERE end >= CURDATE() AND begin <= CURDATE()";  
    	$result = $db->query($query);  
    	$len= mysqli_affected_rows($db); 

	$json = array();
	for($i=0; $i<$len; $i++){
		$row = $result->fetch_assoc();
		$json[$i] = array("id"=>$row['id'],"begin"=>$row['begin'],"end"=>$row['end'],"name"=>$row['name']);
	}
    	$db->close();   
	echo json_encode($json);
?>
