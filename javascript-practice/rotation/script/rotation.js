window.onload = function() {
  var box = document.getElementById("box");
  var list = box.getElementsByTagName("ul")[0];
  var count = box.getElementsByTagName("ul")[1];
  var bar = box.getElementsByTagName("ul")[2];
  var imgs = list.children;
  var nums = count.children;
  var barBtns = bar.children;
  var index = start = 0;
  var play = timer = null;
  //为数字按钮添加 鼠标经过 事件
  for (var i = 0; i < nums.length; i++) {
    nums[i].index = i;
    nums[i].onmouseover = function() {
        show(this.index);
    }
  }
  //为箭头添加事件
  for (var i = 0; i < barBtns.length; i++) {
    barBtns[i].addEventListener("click",function () {
    	movePic(this);
    });
    barBtns[i].addEventListener("mouseover",function () {
    	this.style.opacity = 0.6;
    });
    barBtns[i].addEventListener("mouseout",function () {
    	this.style.opacity = 0.3;
    });

  }
  //切换图片
  function movePic (whichBtn) {
  	var currentNum = count.getElementsByClassName("current")[0].index; //获取图片的位置
      console.log('上一张图片位置') + console.log(currentNum);
      switch (whichBtn.className) {
        case "float-left":
          if (currentNum == 0) { //如果图片是第一张
            currentNum = 4;
            show(currentNum);
            console.log('当前图片位置') + console.log(currentNum);
          } else {
            show(currentNum - 1);
            console.log('当前图片位置') + console.log(currentNum - 1);
          }
          break;
        case "float-right":
          if (currentNum == 4) { //如果图片是最后一张
            currentNum = 0;
            show(currentNum);
            console.log("当前图片位置") + console.log(currentNum);
          } else {
              show(currentNum + 1);
              console.log("当前图片位置") + console.log(currentNum + 1);
          }
          break;
      }
  }
  //鼠标移到box时，停止
  box.onmouseover = function() {
    clearInterval(play);
    bar.style.display = "block";
  }
      //鼠标移出box时，继续
  box.onmouseout = function() {
    autoplay();
    bar.style.display = "none";
  }


  //自动播放
  function autoplay() {
    play = setInterval(function() {
        index++;
        // console.log('autoplay-index')+console.log(index);
        if (index >= 5) index = 0;
        show(index);
    }, 2500);
  }
  autoplay();

  //图片和按钮 切换函数
  function show(argument) {
    index = argument;
    //切换按钮，移到哪个就加current类
    for (var i = 0; i < nums.length; i++) {
        nums[i].className = "";
    }
    nums[index].className = "current";

    //切换图片 移到哪个就加current类 没有淡入淡出效果
    // for(var i = 0; i < imgs.length; i++){
    // 	imgs[i].className = "";
    // }
    // imgs[index].className = "current";

    //初始化
    clearInterval(timer);
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.opacity = 0;
        imgs[i].style.filter = "alpha(opacity=0)";
    }

    //切换图片时，有动画效果
    timer = setInterval(function() {
      start += 4;
      imgs[index].style.opacity = start / 100;
      imgs[index].style.filter = "alpha(opacity = " + start + ")";
      if (start >= 100) {
          start = 0;
          clearInterval(timer);
      }
    }, 20);


  }
}
