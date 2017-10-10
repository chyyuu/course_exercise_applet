<?php 
	error_reporting(0);
	$id = $_GET["id"];
	$json = array();
	$i=0;

	require_once("database.php");
       	$db=db_connect();
	$db->query("set character set 'utf8'");//读库

	$query="SELECT * FROM test WHERE id=".$id;  
    	$result = $db->query($query);  
	$row = $result->fetch_assoc();

function chaxun($str){
	$row_G=$GLOBALS["row"];
	$db =$GLOBALS["db"];
	$json = array();
	$i=0;
	$arr = (array)json_decode($row_G[$str],true);
	foreach($arr as $value){
		$tmp = array();
		$query="SELECT * FROM item WHERE id=".$value;  
    		$result = $db->query($query);  
		$row = $result->fetch_assoc();
		$tmp["id"] =  $row["id"];
		$tmp["knowledge"] =  $row["knowledge"];
		$tmp["source"] =  $row["source"];
		$tmp["explain"] =  $row["explain"];
		$tmp["type"] =  $row["type"];
		$tmp["question"] =  $row["question"];
		$tmp["degree_of_difficulty"] =  $row["degree_of_difficulty"];

		$id=$row["id"];
		$type=$row["type"];

		if ($type == 'true_false') {
			$tmp['options'][0]="A、对";
			$tmp['options'][1]="B、错";
		}
		else if($type == 'single_answer' || $type == 'multi_answer'){
			$query="SELECT * FROM options WHERE item=".$id;  
    			$result = $db->query($query);  
    			$len= mysqli_affected_rows($db); 

			$tmp_opt = array();
			for($j=0; $j<$len; $j++){
				$row = $result->fetch_assoc();
				$tmp_opt[$j] = $row["option"];
			}
			$tmp['options']=$tmp_opt;
		}

		$query="SELECT * FROM answers WHERE item=".$tmp["id"];  
    		$result = $db->query($query);  

		if ($type == 'fill_in_the_blank') {
    			$len= mysqli_affected_rows($db); 
			$tmp_ans = array();
			for($j=0; $j<$len; $j++){
				$row = $result->fetch_assoc();
				$tmp_ans[$j][0] = $row["answer"];
			}
			$tmp['answer']=$tmp_ans;
		}
		else{
			$row = $result->fetch_assoc();
			$tmp["answer"] =  $row["answer"];
		}

		$json[$i]=$tmp;
		$i=$i+1;
	}
	$GLOBALS["json"][$str] = $json;
}
	$json = array();

	chaxun("true_false");
	chaxun("single");
	chaxun("multi");
	chaxun("fill");
	chaxun("question");

    	$db->close();   
	
	echo json_encode($json);
?>
