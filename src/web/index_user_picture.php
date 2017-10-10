<?php 
	$id = $_GET["id"];

	require_once("database.php");
       	$db=db_connect();
	$db->query("set character set 'utf8'");//读库

	$query="SELECT picture FROM pictures_wx WHERE id=".$id.";";  
    	$result = $db->query($query);  
	$row = $result->fetch_assoc();

 	echo $row['picture'];   	
	$db->close();   
?>
