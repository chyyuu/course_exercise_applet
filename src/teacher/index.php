<!DOCTYPE HTML>
<html>
    <meta charset="utf8"> </meta>
<head>
    <title>teacher</title>
    <link href="css.css" type="text/css" rel="stylesheet"/>
</head>

<body>
    <h3>yhb</h3>
<div id="anNiu">
    <button id='chuJuanzi'>出卷子</button>
    <button id='chuTi'>出题</button>
</div>
<div id='chuTi_div'>
        <hr />
	<span> 题目类型：</span>
		<select id="type">
			<option value="true_false">判断题</option>
			<option value="single_answer">单选题</option>
			<option value="multi_answer">多选题</option>
			<option value="question_qnswer">问答题</option>
			<option value="fill_in_the_blank">填空题</option>
		</select><br />
	<span> 题目来源：</span><input type="text" id="source"><br />
	<span> 知识点：</span>
		<select id="knowledge">
			<option value="操作系统概述">操作系统概述</option>
		</select><br />
	<span> 难度：</span>
		<select id="degree_of_difficulty">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
		</select><br />
	<span> 题干正文：</span><input type="text" id="question"><br />
<div id="xuanXiang">
	<div id="panDuan">
		<span> 选项：</span>A、对&nbsp&nbsp&nbsp&nbspB、错<br />
		<span> 答案：</span><input type="text" id="answer"><br />
		<span> 解释：</span><input type="text" id="explain"><br />
	</div>
	<div id="xuanZe" class="buXianshi">
		<span> 选项：</span>
			<div id="xuanXiang_1"><input type="text" id="num_xx" value="请输入选项个数..." /><button id='tianJia_xx'>添加选项</button></div>
			<div id="xuanXiang_xz" class="xuanXiang_div"></div>
		<span> 答案：</span><input type="text" id="answer" /><br />
		<span> 解释：</span><input type="text" id="explain" /><br />
	</div>
	<div id="tianKong" class="buXianshi">
		<span> 答案：</span>
			<div id="daAn_1"><input type="text" id="num_da" value="请输入答案个数..."><button id='tianJia_da'>添加答案</button></div>
			<div id="daAn_xz" class="xuanXiang_div"></div>
		<span> 解释：</span><input type="text" id="explain" /><br />
	</div>
	<div id="wenDa" class="buXianshi">
		<span> 答案：</span><button id='tianJia'>上传答案</button><br />
	</div>
</div>
        <hr />
    	<button id='tiJiao'>提交</button>
</div>


    <div id='chuJuanzi_div'>
        <hr />
        开始时间：<input id="begin" type="date" />结束时间：<input id="end" type="date" />
        <button id='tj'>提交</button>
        <hr />
        <div id='left'>
        	<button id='single_answer' class='ti'>单选题</button>
        	<button id='multi_answer' class='ti'>多选题</button>
        	<button id='true_false' class='ti'>判断题</button>
        	<button id='fill_in_the_blank' class='ti'>填空题</button>
        </div>

        <div id='right'>
        	<div id='items_single_answer'></div>
        	<div id='items_multi_answer'></div>
        	<div id='items_true_false'></div>
        	<div id='items_fill_in_the_blank'></div>
        </div>
    </div>

    <script src="jquery-3.2.1.min.js"></script>
    <script src="4.js"></script>
</body>

</html>