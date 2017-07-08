function Ro (id) {
	this.init(id);
}
Ro.prototype = {
	//初始化
	init : function (id) {
		var thisRo = this;
		this.timer = null;
		this.index = 0;
		this.box = document.getElementById(id);
		this.imgUl = document.getElementsByClassName("imgs")[0];
		this.btnUl = document.getElementsByClassName("btns")[0];
		this.imgLi = this.imgUl.getElementsByTagName("li");
		this.btnLi = this.btnUl.getElementsByTagName("li");
		this.btnLi[0].className = "current";
		this.play = setInterval(function () {
			thisRo.next();
		},2000);
		this.box.onmouseover = function () {
			clearInterval(thisRo.play)
		}
		this.box.onmouseout = function () {
			thisRo.play = setInterval(function () {
			thisRo.next();
		},2000);
		}
		for(var i = 0;i<this.btnLi.length;i++){
			this.btnLi[i].index = i;
			this.btnLi[i].onmouseover = function () {
				thisRo.index = this.index;
				thisRo.toggle();
			}
		}
	},
	//不断轮播
	next : function () {
		this.index++;
		if(this.index==this.imgLi.length) this.index = 0;
		this.toggle();
	},
	//切换按钮
	toggle : function () {
		clearInterval(this.timer);
		for(var i =0;i<this.btnLi.length;i++) this.btnLi[i].className = "";
		this.btnLi[this.index].className = "current";
		var target = -(this.index * this.imgLi[0].offsetWidth);
		this.move(target);
	},
	/*
	轮播到下一张
	target : 下一张的位置
	 */
	move : function (target) {
		var thisRo = this;
		//不断获取当前的位置，改变位置直到变成target
		thisRo.timer = setInterval(function () {
			var prev = thisRo.imgUl.offsetLeft;
			var speed = (target - prev)/5;
			speed >0 ? Math.ceil(speed):Math.floor(speed);
			prev == target ? clearInterval(thisRo.timer) :
			(thisRo.imgUl.style.left = prev + speed + "px")
		}, 20)
	}
}

window.onload = function () {
	new Ro("box");
}