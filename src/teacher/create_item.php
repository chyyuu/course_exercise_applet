<?php 
	$knowledge = $_GET['knowledge'];
	$degree_of_difficulty = $_GET['degree_of_difficulty'];
	$explain = $_GET['explain'];
	$question = $_GET['question'];
	$source = $_GET['source'];
	$answer = $_GET['answer'];
	$type = $_GET['type'];
	$options = $_GET['options'];
	
	require_once('database.php');
       	$db=db_connect();

   	$db->query("set names 'utf8'");  

	$query="INSERT INTO item SET answer='".$answer."',`explain` = '".$explain."',source = '".$source."',type = '".$type."',knowledge = '".$knowledge."',degree_of_difficulty = ".$degree_of_difficulty.",question = '".$question."';";
	echo $query;
	$result = $db->query($query);  
    $len= mysqli_affected_rows($db); 
	echo $len;
    $db->close();   
?>