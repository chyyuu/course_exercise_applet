<?php 
	$txt = $_POST['txt'];
	$arr=(array)json_decode($txt,true);
	
	$single = json_encode($arr['single_answer']);
	$multi = json_encode($arr['multi_answer']);
	$true_false = json_encode($arr['true_false']);
	$fill = json_encode($arr['fill_in_the_blank']);
	$question = json_encode($arr['question_answer']);
	$begin = $arr['begin'];
	$end = $arr['end'];
	$name = $arr['name'];

	require_once('database.php');
       	$db=db_connect();
	$db->query("set names 'utf8'");//写库 

	$query="INSERT INTO test SET single = '".$single."', multi = '".$multi."',true_false = '".$true_false."', question = '".$question."', fill = '".$fill."', name = '".$name."',begin = '".$begin."',end='".$end."';";  
    	$result = $db->query($query);  
    	$len= mysqli_affected_rows($db); 
	echo $len;
    	$db->close();   
?>
