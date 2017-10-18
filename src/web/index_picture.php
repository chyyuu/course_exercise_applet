<?php  
	error_reporting(0);
	$id=$_POST['id'];
	$picForm =$_POST['picForm'];
	$uploadForm =$_POST['uploadForm'];
//var_dump($_FILES);
//var_dump($_POST);

	require_once('database.php');
       	$db=db_connect();

	if($uploadForm){
	    	$image = addslashes(file_get_contents($_FILES['photo']['tmp_name']));  
    		$sqlstr = "insert into pictures SET picture = '".$image."',item = '".$id."',type='A';";
//echo $sqlstr.'======';
    		$result = $db->query($sqlstr);  
    		$len= mysqli_affected_rows($db); 
		if($len!=1){
			echo 0;
			exit;
		}
	}
	if($picForm){
	    	$image = addslashes(file_get_contents($_FILES['pic']['tmp_name']));  
    		$sqlstr = "insert into pictures SET picture = '".$image."',item = '".$id."',type='Q';";
//echo $sqlstr.'======';
    		$result = $db->query($sqlstr);  
    		$len= mysqli_affected_rows($db); 
		if($len!=1){
			echo 0;
			exit;
		}
	}
	echo 1;
?>
