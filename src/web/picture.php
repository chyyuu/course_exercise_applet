<?php 
	$id = $_GET["id"];

	require_once("database.php");
       	$db=db_connect();
	$db->query("set character set 'utf8'");//读库

	$query="SELECT * FROM pictures WHERE item=".$id.";";  
    	$result = $db->query($query);  
	$row = $result->fetch_assoc();
    	
	$db->close();   
	echo $row['picture'];
?>
