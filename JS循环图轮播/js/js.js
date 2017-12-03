//封装getElementById()
function getE(Id){
	return typeof(Id)==="string"?document.getElementById(Id):Id;
}

function slideimg(){
	var index=0,
		index1=0,
		timer=null,
		pics=getE("banner").getElementsByTagName("a"),
		prev=getE("prev");
		next=getE("next");
		dots=getE("dots").getElementsByTagName("span"),
		menu=getE("menu_content").getElementsByTagName("a"),
		sub_menu=getE("sub_menu"),
		inner_box=sub_menu.getElementsByClassName("inner_box");
	var	len=pics.length;
	var main=getE("main");

	//鼠标划过时暂停轮播
	main.onmouseover=function(){
		if(timer){
			clearInterval(timer);
		}
	}

	//鼠标离开后开始轮播
	main.onmouseout=function(){
		timer=setInterval(function(){
			index++;
			if(index>=len){
				index=0;
			}
			changeimg();
		},3000)
	}
	//调用main.onmouseout方法,使其自动开始轮播
	main.onmouseout();

	//点击右下角圆点开始切换图片
	for(var d=0;d<len;d++){
		dots[d].id=d;
		dots[d].onclick=function(){
			index=this.id;
			changeimg();
		}
	}

	//点击上一张
	prev.onclick=function(){
		index--;
		if(index<0){
			index=len-1;
		}
		changeimg();
	}

	//点击下一张
	next.onclick=function(){
		index++;
		if(index>=len){
			index=0;
		}
		changeimg();
	}

	//切换图片
	function changeimg(){
		for(var i=0;i<len;i++){
			pics[i].style.display="none";
			dots[i].className="";
		}
		pics[index].style.display="block";
		dots[index].className="active";
	}

	//导航菜单
	for(var m=0;m<menu.length;m++){
		//给每一个菜单添加一个data_index属相,作为索引
		menu[m].setAttribute("data_index",m);
		menu[m].onmouseover=function(){
			index1=this.getAttribute("data_index");
			submenushow();
		}

		menu[m].onmouseout=function(){
			for(var n=0;n<menu.length;n++){
				inner_box[n].style.display="none";
			}
			sub_menu.style.display="none";
		}

		sub_menu.onmouseover=function(){
			this.style.display="block";
			inner_box[index1].style.display="block";
		}

		sub_menu.onmouseout=function(){
			this.style.display="none";
		}
	}

	//子菜单隐现
	function submenushow(){
		for(var n=0;n<menu.length;n++){
			inner_box[n].style.display="none";
		}
		sub_menu.style.display="none";
		sub_menu.style.display="block";
		inner_box[index1].style.display="block";
	}  
}

slideimg();