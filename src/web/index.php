<!DOCTYPE HTML>
<html>
    <meta charset="utf8"> </meta>
<head>
    <title>teacher</title>
    <link href="css_js/css.css" type="text/css" rel="stylesheet"/>
</head>

<body>
    <h3>yhb</h3>
<div id="anNiu">
    <button id='chuJuanzi'>出卷子</button>
    <button id='chuTi'>出题</button>
    <button id='piZhuye'>批作业</button>
</div>

<div id="piZhuye_div" class="bu_xianshi">
	<select id="test_zuoye">
		<option value='first'>请选择测试</option>
<?php
		require_once('../database.php');
       		$db=db_connect();
		$db->query("set names 'utf8'");//写库 

       		$query="select id,name from test;";
       		$result = $db->query($query);  
    		$len= mysqli_affected_rows($db); 
		for($i=0; $i<$len; $i++){
			$row = $result->fetch_assoc();
			echo '<option value="'.$row['id'].'">'.$row['name'].'</option>';
		}
    		$db->close();   
?>
	</select>
	<select id="item_zuoye"><option value='first'>请选择试题</option></select>
	<select id="user_zuoye"><option value='first'>请选择学生</option></select>
	<button class='quXiao'>结束</button>
	<div id="pic_zuoye"></div>
</div>

<div id='chuTi_div' class="bu_xianshi">
        <hr />
	<span> 题目类型：</span>
		<select id="type">
			<option value="true_false">判断题</option>
			<option value="single_answer">单选题</option>
			<option value="multi_answer">多选题</option>
			<option value="fill_in_the_blank">填空题</option>
			<option value="question_answer">问答题</option>
		</select><br />
	<span> 题目来源：</span><input type="text" id="source"><br />
	<span> 知识点：</span>
		<select id="course">
			<option value="编译原理">编译原理</option>
			<option value="计算机科学导论">计算机科学导论</option>
		</select>
		<select id="knowledge">
<?php
		require_once('../database.php');
       		$db=db_connect();
		$db->query("set names 'utf8'");//写库 

       		$query="select knowledge from item where course='编译原理' group by knowledge;";
       		$result = $db->query($query);  
    		$len= mysqli_affected_rows($db); 
		for($i=0; $i<$len; $i++){
			$row = $result->fetch_assoc();
			echo '<option value="'.$row['knowledge'].'">'.$row['knowledge'].'</option>';
		}
    		$db->close();   
?>
			<option value="qita">其他</option>
		</select>
		<input type="text" id="knowledge_qita"  class="bu_xianshi" onfocus="if(this.value=='请输入知识点类型...') {this.value='';}" onblur="if(this.value=='') {this.value='请输入知识点类型...';}" value="请输入知识点类型..." /><br />
	<span> 难度：</span>
		<select id="degree_of_difficulty">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
		</select><br />
	<span> 题干正文：</span><textarea id="question"></textarea><br />
	<span>&nbsp</span><form id= "picForm"><input type="file" id="pic" name="pic"/></form>
	<div id="xuanXiang">
		<span> 选项：</span>A、对&nbsp&nbsp&nbsp&nbspB、错<br />
		<span> 答案：</span><input type="text" id="answer"><br />
		<span> 解释：</span><textarea id="explain"></textarea><br />
	</div>
        <hr />
    	<button id='tijiao_shiti'>提交</button>
    	<button class='quXiao'>取消</button>
</div>

<div id='course_knowledge' class="bu_xianshi">
	<hr />
    	<select id="course_juanzi">
			<option value="编译原理">编译原理</option>
			<option value="计算机科学导论">计算机科学导论</option>
		</select>
    	<button id="tijiao_knowledge">开始</button>
    	<button class='quXiao'>取消</button>
    	<div id="knowledge_juanzi"></div>
</div>
<div id="chuJuanzi_div" class="bu_xianshi">
       	<hr />
        测试名称：<input id="name" type="text" />
        <button id='tijiao_juanzi'>提交</button>
    	<button class='quXiao'>取消</button><br />
		开始时间：<input id="begin" type="date" />结束时间：<input id="end" type="date" />
        <hr />
        <div id='left'>
        	<button id='single_answer' class='jiazai_shiti'>单选题</button>
        	<button id='multi_answer' class='jiazai_shiti'>多选题</button>
        	<button id='true_false' class='jiazai_shiti'>判断题</button>
        	<button id='fill_in_the_blank' class='jiazai_shiti'>填空题</button>
        	<button id='question_answer' class='jiazai_shiti'>问答题</button>
        </div>

        <div id='right'>
        	<div id='items_single_answer'></div>
        	<div id='items_multi_answer'></div>
        	<div id='items_true_false'></div>
        	<div id='items_fill_in_the_blank'></div>
        	<div id='items_question_answer'></div>
        </div>
</div>

    	<script src="css_js/jquery-3.2.1.min.js"></script>
    	<script src="css_js/index.js"></script>
</body>

</html>
