/*
    动画移动函数封装
    dom----dom对象
    json---{width:100}例子
    callback-----回调函数
*/ 
function move(dom,json,callback){
	//让每一次动画都是全新的
	clearInterval(dom.timer);
	dom.timer = setInterval(function(){
		//所有元素执行完毕以后的状态
		var mark = true;
		//循环所有动画的属性
		for(var attr in json){
			var cur = null;
			//如果是opacity的透明的动画
			if(attr=="opacity"){
				//获取已经产生的透明度
				cur = getStyle(dom,attr) * 100;
			}else{
				//获取已经执行的距离
				cur = parseInt(getStyle(dom,attr)) || 0;
			}
			//获取目标终止值
			var target = json[attr];
			//速度，*0.2是增加摩擦力
			var speed = (target - cur) *0.2;
			//如果cur在执行过程中因为已经除去了小数部分。而速度可能会产生小数位 
			//所有说当cur执行的递增，那么可能cur到达不了目标,当速度是大于0的上取整，然后整数+speed==目标
			//199 +1 200 反之向下取整
			speed = (speed>0 ? Math.ceil(speed): Math.floor(speed));
			if(cur != target){
				mark = false;
				if(attr=="opacity"){
					dom.style.opacity= (cur+speed)/100;
					dom.style.filter = "alpha(opacity="+((cur+speed))+")";
				}else{
					dom.style[attr]= cur+speed+"px";
				}
			}
		}
		//如果执行完毕，
		if(mark){
			//清楚动画
			clearInterval(dom.timer);
			//回调函数，一定要放在下面。要不然你动画没有关闭。
			if(callback)callback.call(dom);
		}
	},30);
}
function $(id){
	return document.querySelector(id);
};
//获取css中的样式的值，跟浏览器兼容无关
function getStyle(dom,attr){
	return window.getComputedStyle ? window.getComputedStyle(dom,false)[attr]:dom.currentStyle[attr];
};