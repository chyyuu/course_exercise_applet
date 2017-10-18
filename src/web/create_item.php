<?php 
	error_reporting(0);
	$course = $_POST["course"];
	$knowledge = $_POST['knowledge'];
	$degree_of_difficulty = $_POST['degree_of_difficulty'];
	$explain = $_POST['explain'];
	$question = $_POST['question'];
	$source = $_POST['source'];
	$answer = $_POST['answer'];
	$type = $_POST['type'];
	$options = $_POST['options'];
	
	require_once('database.php');
       	$db=db_connect();
   	$db->query("set names 'utf8'");  
   	
	$query="INSERT INTO item SET `explain` = '".$explain."',source = '".$source."',type = '".$type."',course = '".$course."',knowledge = '".$knowledge."',degree_of_difficulty = ".$degree_of_difficulty.",question = '".$question."';";
	$result = $db->query($query);
	$len= mysqli_affected_rows($db); 
    
    	$query="select max(id) as id from item";
	$result = $db->query($query);  
	$row = $result->fetch_assoc();

	if($type != 'question_answer'){
		foreach($answer as $val){
			$query="INSERT INTO answers SET item='".$row['id']."' , `answer` = '".$val."';";
			$result = $db->query($query);  
		}
	}

	if($type == 'single_answer' || $type == 'multi_answer'){
		foreach($options as $val){
			$query="INSERT INTO options SET item='".$row['id']."' , `option` = '".$val."';";
			$result = $db->query($query);  
		}
	}
	$json = array();
	$json[$row['id']] = $len;

	$json_obj = json_encode($json);
	echo $json_obj;
    	$db->close();   
?>
