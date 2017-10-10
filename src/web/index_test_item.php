<?php 
	error_reporting(0);
	$id = $_POST["id"];

	require_once("database.php");
       	$db=db_connect();
	$db->query("set character set 'utf8'");//读库

	$query="SELECT question FROM test WHERE id=".$id;  
    	$result = $db->query($query);  
	$row = $result->fetch_assoc();
	echo $row['question'];

    	$db->close();   
?>
