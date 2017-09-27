<?php
	$userRole = $_GET['userRole'];
	$userNum = $_GET['userNum'];
	$userClass = $_GET['userClass'];
	$userName = $_GET['userName'];
	
	require_once('database.php');
       	$db=db_connect();

	$query="insert into user set userRole ='".$userRole."', userNum='".$userNum."', userName='".$userName."', userClass='".$userClass."'";
	$result = $db->query($query);
	$rows= mysqli_affected_rows($db);
	$db->close();

	$arr = array('userRole'=>$userRole,'userName'=>$userName,'userNum'=>$userNum,'userClass'=>$userClass,'rows'=>$rows);
	echo json_encode($arr);
?>
