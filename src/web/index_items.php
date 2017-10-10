<?php 
	error_reporting(0);
	$type = $_POST['type'];
	$course = $_POST['course'];
	$knowledge = (array)json_decode($_POST['knowledge'],true);

	require_once('database.php');
       	$db=db_connect();
   	$db->query("set names 'utf8'");  

	$query="SELECT * FROM item WHERE type='".$type."' AND course='".$course."' AND (";  
	$len=sizeof($knowledge)-1;
	for($i=0; $i<$len; $i++){
		$query=$query ."knowledge='".$knowledge[$i]."' OR ";
    	} 
	$query=$query ."knowledge='".$knowledge[$i]."');";
	$result = $db->query($query);  
    	$len= mysqli_affected_rows($db); 
	if($len==0){
		echo 0;
		exit();
	}
	$json = array();
    	for($i=0; $i<$len; $i++){ 
		$row = $result->fetch_assoc();
        	$json[$row['id']] = $row['question'];  
    	} 
    	$db->close();   

	$json_obj = json_encode($json);
	echo $json_obj;
?>
