$(document).ready(function(){
	$("#chuJuanzi_div").hide();
	$("#chuTi_div").hide();

	$("#tiJiao").click(function(){
		var type=$("#type").val();
		var options; 
		var answer=$("#answer").val();
		if(type == 'true_false')
			options =["A.对","B.错"];
		else if(type == 'single_answer' || type == 'multi_answer')
			options =["A.对","B.错"];
//alert($("#answer").val());
		$.ajax({
    			url:'create_item.php',
    			type:'GET',
           	 	cache : false,
                	contentType:"application/x-www-form-urlencoded:charset=UTF-8",
    			data:{
   		 		"knowledge":$("#knowledge").val(),
    				"degree_of_difficulty":$("#degree_of_difficulty").val(),
    				"explain":$("#explain").val(),
    				"question":$("#question").val(),
    				"source":$("#source").val(),
    				"answer": answer,
    				"type":type,
    				"options": options
    			},
    			success:function(data){ 	
				alert(data);	
			},
        		error:function(xml){
            			alert("shibei!。。。。" + xml.responseText);
        		}
		});
	});
	$("#tianJia_xx").click(function(){
		var num = parseInt($("#num_xx").val());
		$("#xuanXiang_1").hide();
		$("#xuanXiang_xz").show();
		while(num--)
        		$("#xuanXiang_xz").append($("<input type='text'><br />")); 
	});
	$("#tianJia_da").click(function(){
		var num = parseInt($("#num_da").val());
		$("#daAn_1").hide();
		$("#daAn_xz").show();
		while(num--)
        		$("#daAn_xz").append($("<input type='text'><br />")); 
	});
	$('#type').change(function(){
		var s = $(this).children('option:selected').val();
		$("div#xuanXiang>div").hide();
		switch(s){
			case 'true_false':
				$("#panDuan").show();
				break;
			case 'single_answer':
				$("#xuanZe").show();
				break;
			case 'multi_answer':
				$("#xuanZe").show();
				break;
			case 'fill_in_the_blank':
				$("#tianKong").show();
				break;
			case 'question_qnswer':
				$("#wenDa").show();
				break;
		}
	});
	
	$("#xuanTi").click(function(){
		$("#xuanTi_div").show();
		$("div#anNiu button").attr('disabled',true);
	});
	
	$("#chuTi").click(function(){
		$("#chuTi_div").show();
		$("div#anNiu button").attr('disabled',true);
	});
	$("#chuJuanzi").click(function(){
		$("#chuJuanzi_div").show();
		$("div#anNiu button").attr('disabled',true);
	});
    	$(".ti").click(function(){
//      alert($(this).attr("id"));
   		var type=$(this).attr("id");
		$("#right div").hide();
		$("#items_"+type).show();
		if($("#items_"+type).html()){
			alert('cunzai!');
			return;
		}
       		$.ajax({
	    		url:'index_items.php',
	       		type:'GET',
	       		dataType:'json',
	       		data:{"type":type},
	       		success:function(data){
			    	$.each(data, function(n,value){
	           			$("#items_"+type).append("<input type='checkbox' value='"+n+"' name='header'/>"+ value +"<br />");
	     			});
       			},
            		error:function(xml){
            			alert("shibei!。。。。" + xml.responseText);
            		}
        	});
    	});

	$("#tj").click(function(){
		var arr = {};
		var arr_tmp = [];

		$('#items_single_answer input:checkbox').each(function() {
			if ($(this).prop("checked")) {
           	 	arr_tmp.push($(this).val());
   	 		}
		});
        	arr["single_answer"]=arr_tmp;
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
//		alert('items_single_answer: '+ arr_tmp);
//alert($('#begin').val());
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

        	$("#xuanTi_div").hide();
        	$("#items_single_answer").empty();
        	$("#items_fill_in_the_blank").empty();
        	$("#items_true_false").empty();
        	$("#items_multi_answer").empty();
        	$('#begin').val("");
       		$('#end').val("");
//alert(JSON.stringify(arr));
		$.ajax({
	    		url:'index_test.php',
	       		type:'GET',
	       		dataType:'json',
	       		data:{"txt":JSON.stringify(arr)},
	       		success:function(data){
				if(data == 1)
					alert("出题成功！<br />"+JSON.stringify(arr));
				else
					alert("出题失败！"+data);

//			    	$.each(data, function(n,value){
//	           			$("#items_"+type).append("<input type='checkbox' value='"+n+"' name='header'/>"+ value +"<br />");
//	     			});
       			},
            		error:function(xml){
            			alert("shibei!。。。。" + xml.responseText);
            		}
        	});
	});
});