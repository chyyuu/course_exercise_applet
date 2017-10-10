<?php  
	$id=$_POST['id'];

	require_once('database.php');
       	$db=db_connect();

    	$image = addslashes(file_get_contents($_FILES['photo']['tmp_name']));  
    	$sqlstr = "insert into pictures SET picture = '".$image."',item = '".$id."';";
  
    	$result = $db->query($sqlstr);  
    	$len= mysqli_affected_rows($db); 

	echo $len;
?>
