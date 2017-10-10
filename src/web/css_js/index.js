$(document).ready(function(){
//下拉选项变化

////批作业
	$('#test_zuoye').change(function(){
		$("#item_zuoye").empty();
		$("#user_zuoye").empty();
		$("#pic_zuoye").empty();
		$("#item_zuoye").append("<option value='first'>请选择试题</option>");
		$("#user_zuoye").append("<option value='first'>请选择学生</option>");
		if($('#test_zuoye').val()=="first")
			return;
		$.ajax({
	    		url:'index_test_item.php',
	       		type:'POST',
	       		dataType:'json',
	       		data:{"id":$('#test_zuoye').val()},
	       		success:function(data){
			    	$.each(data, function(n,value){
	           			$("#item_zuoye").append('<option value="'+ value +'">'+ value +'</option>');
	     			});
       			},
            		error:function(xml){
            			alert("shibei!。。。。" + xml.responseText);
            		}
        	});
	});

	$('#item_zuoye').change(function(){
		$("#user_zuoye").empty();
		$("#pic_zuoye").empty();
		$("#user_zuoye").append("<option value='first'>请选择学生</option>");
		if($('#test_zuoye').val()=="first")
			return;
		$.ajax({
	    		url:'index_item_user.php',
	       		type:'POST',
	       		dataType:'json',
	       		data:{"item":$('#item_zuoye').val()},
	       		success:function(data){
			    	$.each(data, function(n,value){
	           			$("#user_zuoye").append('<option value="'+ n +'">'+ value +'</option>');
	     			});
       			},
            		error:function(xml){
            			alert("shibei!。。。。" + xml.responseText);
            		}
        	});
	});

	$('#user_zuoye').change(function(){
		$("#pic_zuoye").empty();
		$id=$('#user_zuoye').val();
		if($id=="first")
			return;
		$("#pic_zuoye").append('<img src="index_user_picture.php?id=show&id='+$id+'" width="100%">');
	});

////出卷子
	$('#course_juanzi').change(function(){
		$("#tijiao_knowledge").attr('disabled',true);
		$("#knowledge_juanzi").empty();
		$.ajax({
	    		url:'index_course.php',
	       		type:'POST',
	       		dataType:'json',
	       		data:{"course":$('#course_juanzi').val()},
	       		success:function(data){
			    	$.each(data, function(n,value){
	           			$("#knowledge_juanzi").append("<input type='checkbox' value='"+ value +"' />"+ value);
	     			});
				$('#knowledge_juanzi input:checkbox').change(function(){
					$("#tijiao_knowledge").attr('disabled',false);
				});
       			},
            		error:function(xml){
            			alert("shibei!。。。。" + xml.responseText);
            		}
        	});
	});

////出题
	$("#knowledge").change(function(){
		if($("#knowledge").val()=='qita')
			$("#knowledge_qita").show();
		else{
			$("#knowledge_qita").hide();
			$("#knowledge_qita").val("请输入知识点类型...");
		}
	});

	$('#course').change(function(){
		$("#knowledge").empty();
		$.ajax({
	    		url:'index_course.php',
	       		type:'POST',
	       		dataType:'json',
	       		data:{"course":$('#course').val()},
	       		success:function(data){
			    	$.each(data, function(n,value){
	           			$("#knowledge").append("<option value='"+ value +"'>"+ value +"</option>");
	     			});
	           		$("#knowledge").append("<option value='qita'>其他</option>");
				$("#knowledge_qita").val("请输入知识点类型...");
				if($("#knowledge").val()=='qita')
					$("#knowledge_qita").show();
				else
					$("#knowledge_qita").hide();
       			},
            		error:function(xml){
            			alert("shibei!。。。。" + xml.responseText);
            		}
        	});
	});

	$('#type').change(function(){
		$("#source").val("");
		$("#question").val("");
		$("#xuanXiang").empty();
		var s = $(this).children('option:selected').val();
		switch(s){
			case 'true_false':
        			$("#xuanXiang").append($('<span> 选项：</span>A、对&nbsp&nbsp&nbsp&nbspB、错<br /><span> 答案：</span><input type="text" id="answer"><br /><span> 解释：</span><input type="text" id="explain"><br />')); 
				break;
			case 'single_answer':
			case 'multi_answer':
        			$("#xuanXiang").append($('<span> 选项：</span><div id="xuanXiang_1"><input type="text" id="num_xx" value="请输入项数..." /><button id="tianJia_xx">添加选项</button></div><div id="xuanXiang_xz" class="xuanXiang_div"></div><span> 答案：</span><input type="text" id="answer" /><br /><span> 解释：</span><input type="text" id="explain" /><br />')); 
				break;
			case 'fill_in_the_blank':
        			$("#xuanXiang").append($('<span> 答案：</span><div id="xuanXiang_1"><input type="text" id="num_xx" value="请输入项数..." /><button id="tianJia_xx">添加答案</button></div><div id="xuanXiang_xz" class="xuanXiang_div"></div><span> 解释：</span><input type="text" id="explain" /><br />')); 
				break;
			case 'question_answer':
        			$("#xuanXiang").append($('<span> 答案：</span><form id= "uploadForm"><input type="file" name="photo"/></form>')); 
				break;
		}
		$("#num_xx").focus(function(){
			if(this.value=="请输入项数..." )
			 	this.value="";
		});
 		$("#num_xx").blur(function(){
			if(this.value=="") 
				this.value="请输入项数...";
		});
		$("#tianJia_xx").click(function(){
			var num = parseInt($("#num_xx").val());
			$("#xuanXiang_1").hide();
			$("#xuanXiang_xz").show();
			$("#xuanXiang_xz").empty();
			while(num--)
        			$("#xuanXiang_xz").append($("<input type='text' name='xuanXiang'><br />")); 
		});
	});
	
//点击按钮
	$("#piZhuye").click(function(){
		$("#piZhuye_div").show();
		$("#anNiu button").attr('disabled',true);
	});

	$(".quXiao").click(function(){
		location.reload();
	});

	$("#chuTi").click(function(){
		$("#chuTi_div").show();
		$("#anNiu button").attr('disabled',true);
		if($("#knowledge").val()=='qita')
			$("#knowledge_qita").show();
	});

	$("#chuJuanzi").click(function(){
		$("#course_knowledge").show();
		$("#anNiu button").attr('disabled',true);
		$("#tijiao_knowledge").attr('disabled',true);
		$.ajax({
	    		url:'index_course.php',
	       		type:'POST',
	       		dataType:'json',
	       		data:{"course":$('#course_juanzi').val()},
	       		success:function(data){
			    	$.each(data, function(n,value){
	           			$("#knowledge_juanzi").append("<input type='checkbox' value='"+ value +"' />"+ value);
	     			});
				$('#knowledge_juanzi input:checkbox').change(function(){
					$("#tijiao_knowledge").attr('disabled',false);
				});
       			},
            		error:function(xml){
            			alert("shibei!。。。。" + xml.responseText);
            		}
        	});
	});

    	$(".jiazai_shiti").click(function(){
		var type=$(this).attr("id");
		$("#right div").hide();
		$("#items_"+type).show();
		if($("#items_"+type).html()){
			return;
		}
		var knowledge = [];

		$('#knowledge_juanzi input:checkbox').each(function() {
			if ($(this).prop("checked")) {
           	 		knowledge.push($(this).val());
   	 		}
		});
       		$.ajax({
	    		url:'index_items.php',
	       		type:'POST',
	       		dataType:'json',
	       		data:{
				"type": type,
				"course":$("#course_juanzi").val(),
				"knowledge": JSON.stringify(knowledge)
			},
	       		success:function(data){
				if(data=='0'){
	           			$("#items_"+type).append("<p style='font-family:verdana;color:red'>不好意思，题库中还没有符合条件的该类型的试题。。。</p>");
					return;
				}
			    	$.each(data, function(n,value){
	           			$("#items_"+type).append("<input type='checkbox' value='"+n+"' name='header'/>"+ value +"<br />");
	     			});
       			},
            		error:function(xml){
            			alert("shibei!。。。。" + xml.responseText);
            		}
        	});
    	});

	$("#tijiao_knowledge").click(function(){
		$("#tijiao_knowledge").attr('disabled',true);
		$("#chuJuanzi_div").show();
		$("#course_juanzi").attr('disabled',true);
		$("div#knowledge_juanzi input").attr('disabled',true);
	});

//提交按钮
	$("#tijiao_juanzi").click(function(){
		var arr = {};
		var arr_tmp = [];

		$('#items_single_answer input:checkbox').each(function() {
			if ($(this).prop("checked")) {
           	 		arr_tmp.push($(this).val());
   	 		}
		});
        	arr["single_answer"]=arr_tmp;
		arr_tmp = [];

		$('#items_question_answer input:checkbox').each(function() {
			if ($(this).prop("checked")) {
           	 	arr_tmp.push($(this).val());
   	 		}
		});
        	arr["question_answer"]=arr_tmp;
		arr_tmp = [];

		$('#items_multi_answer input:checkbox').each(function() {
			if ($(this).prop("checked")) {
           	 	arr_tmp.push($(this).val());
   	 		}
		});
        	arr["multi_answer"]=arr_tmp;
		arr_tmp = [];

        	$('#items_true_false input:checkbox').each(function() {
			if ($(this).prop("checked")) {
           	 	arr_tmp.push($(this).val());
   	 		}
		});
        	arr["true_false"]=arr_tmp;
		arr_tmp = [];

        	$('#items_fill_in_the_blank input:checkbox').each(function() {
			if ($(this).prop("checked")) {
               	arr_tmp.push($(this).val());
       	 	}
		});
        	arr["fill_in_the_blank"]=arr_tmp;
        	if($('#begin').val())
            		arr["begin"]= $('#begin').val();
        	else{
            		alert("请选择开始时间！");
            		return;
        	}
        	if($('#end').val())
            		arr["end"]= $('#end').val();
        	else{
            		alert("请选择结束时间！");
            		return;
        	}
        	if($('#name').val())
            		arr["name"]= $('#name').val();
        	else{
            		alert("请填写测试名称！");
            		return;
        	}
		$.ajax({
	    		url:'index_test.php',
	       		type:'POST',
	       		dataType:'json',
	       		data:{"txt":JSON.stringify(arr)},
	       		success:function(data){
				if(data == 1)
					alert("出题成功！");
				else
					alert("出题失败！");
				location.reload();
       			},
            		error:function(xml){
            			alert("shibei!。。。。" + xml.responseText);
            		}
        	});
	});

	$("#tijiao_shiti").click(function(){
		var type=$("#type").val();
		var options=[]; 
		var answer=[];
		var i=0;j=0;
		if(type == 'single_answer' || type == 'multi_answer'){
			$("div#xuanXiang_xz input[name='xuanXiang']").each(function(i){
				options[i++] = this.value;
			});
		}

		if(type == 'fill_in_the_blank'){
			$("div#xuanXiang_xz input[name='xuanXiang']").each(function(i){
				answer[j++] = this.value;
			});
		}
		else
			answer[0] =$("#answer").val();
		if($("#knowledge").val()=='qita')
			$knowledge =  $("#knowledge_qita").val();
		else
			$knowledge =  $("#knowledge").val();

		$.ajax({
    			url:'create_item.php',
    			type:'POST',
    			data:{
   		 		"course":$("#course").val(),
   		 		"knowledge":$knowledge,
    				"degree_of_difficulty":$("#degree_of_difficulty").val(),
    				"explain":$("#explain").val(),
    				"question":$("#question").val(),
    				"source":$("#source").val(),
    				"answer": answer,
    				"type":type,
    				"options": options
    			},
    			success:function(data){ 	
				alert('出题成功！题号为：'+data);
				if(type == 'question_answer'){
     					var formData = new FormData($("#uploadForm")[0]); 
					formData.append("id", data);
	     				$.ajax({  
          					url: 'index_picture.php' ,  
          					type: 'POST',  
          					data: formData,  
          					async: false,  
          					cache: false,  
          					contentType: false,  
          					processData: false,  
          					success: function (data) {  
							if(data=='1')
								alert('图片上传成功！');
							else
								alert('图片上传失败！');
							location.reload();
          					},  
        					error:function(xml){
            						alert("pic----shibei!。。。。" + xml.responseText);
        					}
     					});  
				}
				location.reload();
			},
        		error:function(xml){
            			alert("tj----shibei!。。。。" + xml.responseText);
        		}
		});
	});
});