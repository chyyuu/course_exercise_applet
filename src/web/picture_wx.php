<?php  
	$user=$_POST['user'];
	$item=$_POST['item'];

	require_once('database.php');
       	$db=db_connect();

    	$image = addslashes(file_get_contents($_FILES['file']['tmp_name']));  
    	$sqlstr = "insert into pictures_wx SET picture = '".$image."', user = '".$user."', item = '".$item."';";
  
    	$result = $db->query($sqlstr);  
    	$len= mysqli_affected_rows($db); 

	echo $len;
?>
