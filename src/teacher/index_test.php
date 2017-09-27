<?php 
	$txt = $_GET['txt'];
	$arr=(array)json_decode($txt,true);
	
	$single = json_encode($arr['single_answer']);
	$multi = json_encode($arr['multi_answer']);
	$true_false = json_encode($arr['true_false']);
	$fill = json_encode($arr['fill_in_the_blank']);
	$begin = $arr['begin'];
	$end = $arr['end'];

	require_once('database.php');
       	$db=db_connect();
	$query="INSERT INTO test SET single = '".$single."', multi = '".$multi."',true_false = '".$true_false."', fill = '".$fill."',begin = '".$begin."',end='".$end."';";  
    	$result = $db->query($query);  
    	$len= mysqli_affected_rows($db); 
	echo $len;
    	$db->close();   
?>