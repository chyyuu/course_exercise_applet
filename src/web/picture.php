<?php 
	$id = $_GET["id"];
	$type = $_GET["type"];

	require_once("database.php");
       	$db=db_connect();
	$db->query("set character set 'utf8'");//读库

	$query="SELECT * FROM pictures WHERE item=".$id." AND type='".$type."';";  
    	$result = $db->query($query);  
	$row = $result->fetch_assoc();
    	
	$db->close();   
	echo $row['picture'];
?>
