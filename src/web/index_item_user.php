<?php  
	$item=$_POST['item'];

	require_once('database.php');
       	$db=db_connect();
	$db->query("set character set 'utf8'");//读库

    	$query = "select pictures_wx.id,user.userName from pictures_wx,user where pictures_wx.user=user.id and pictures_wx.item=".$item;
  
    	$result = $db->query($query);  
    	$len= mysqli_affected_rows($db); 
	$json = array();
    	for($i=0; $i<$len; $i++){ 
		$row = $result->fetch_assoc();
        	$json[$row['id']] = $row['userName'];  
    	} 
    	$db->close();   

	$json_obj = json_encode($json);
	echo $json_obj;
?>
