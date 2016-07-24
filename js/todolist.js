var text=document.querySelector('.text');
var comList=document.querySelector(".com-box .now-list");
var comTips=document.querySelector(".com-box .tips");
var nowList=document.querySelector(".now-box .now-list");
var nowTips=document.querySelector(".now-box .tips");
text.onkeydown=function(e){
	if(e.keyCode==13){
		var val=this.value;
		if(val.length==0){
			alert("不能为空！");
			return;
		}else{
			var data=getData();
			data.push({
				title:val,
				status:false
			});
			this.value="";
			saveData(data);
			reload();
		}
		
	}
}
getData();
function getData(){
	var data=JSON.parse(localStorage.getItem("todus"));
	return data||[];
}

function saveData(data){
	localStorage.setItem("todus", JSON.stringify(data));
}
// console.log(JSON.parse(localStorage.getItem("todos")));
reload();
function reload(){
	var nowStr="",
		nowNum=0,
		comStr="",
		comNum=0;
	var data=getData();
	for(var i=0;i<data.length;i++){
		if(data[i].status==false){
			nowStr+='<li class="now-content"><input type="checkbox" onclick=changeStatus('+i+',true)><p class="nowcon" contenteditable onblur=changeContent('+i+',this.innerHTML)>'+data[i].title+'</p><div class="del-btn" onclick=delData('+i+')><div class="del"></div></div></li>';
			nowNum++;
		}else{
			comStr+='<li class="now-content" ><input type="checkbox" checked onclick=changeStatus('+i+',false)><p class="nowcon" contenteditable onblur=changeContent('+i+',this.innerHTML)>'+data[i].title+'</p><div class="del-btn" onclick=delData('+i+')><div class="del"></div></div></li>';
			comNum++;
		}
	}
	comList.innerHTML=comStr;
	comTips.innerHTML=comNum;
	nowList.innerHTML=nowStr;
	nowTips.innerHTML=nowNum;
}
function changeContent(i,text){
	var data=getData();
	data[i].title=text;
	saveData(data);
}
function changeStatus(i,sta){
	var data=getData();
	data[i].status=sta;
	saveData(data);
	reload();
}
function delData(i){
	var data=getData();
	data.splice(i,1);
	saveData(data);
	reload();
}