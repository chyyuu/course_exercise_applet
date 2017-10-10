<?php
	$userRole = $_GET['userRole'];
	$userNum = $_GET['userNum'];
	$userClass = $_GET['userClass'];
	$userName = $_GET['userName'];
	
	require_once('database.php');
       	$db=db_connect();
   	$db->query("set names 'utf8'");  

	$query="insert into user set userRole ='".$userRole."', userNum='".$userNum."', userName='".$userName."', userClass='".$userClass."'; select max(id) as id from user;";

	if ($db->multi_query($query)){  
    		do {  
        		$res = $db->store_result();  
        		if ($res instanceof mysqli_result){  
            			while ($row = $res->fetch_assoc()){  
					$arr = array('userId'=>$row['id'],'userRole'=>$userRole,'userName'=>$userName,'userNum'=>$userNum,'userClass'=>$userClass,'rows'=>$rows);
            			}  
        		}
			else{
				$rows=mysqli_affected_rows($db); 
			}
		} while ($db->more_results() && $db->next_result());  //调用next_result()之前必须调用more_result() 
	}

	echo json_encode($arr);
	$db->close();
?>
