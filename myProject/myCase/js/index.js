function Slider() {
  this.init();
}
Slider.prototype = {
  constructor: Slider,
  init: function() {
    var _this = this;
    this.index = this.speed = 0;
    this.timer = this.play = null;
    this.banner = $(".header-banner")[0];
    this.sliderLists = $(".slider-lists")[0];
    this.sliderItem = $(".slider-item");
    this.prevBtn = $(".prev")[0];
    this.nextBtn = $(".next")[0];
    this.countBtn = $(".slider-count>ul>li");
    this.autoplay();
    this.setMarginLT();
    $(window).resize(function () {
      _this.setMarginLT();
    });
    for(var i = 0; i<this.countBtn.length;i++){
      this.countBtn[i].index = i;
      this.countBtn[i].onclick = function () {
        _this.index = this.index;
        _this.toggle(_this.index);
      }
    }
    this.prevBtn.onclick = function () {
      _this.index --;
      _this.index <0 && (_this.index = _this.countBtn.length-1);
      _this.toggle(_this.index);
    }
    this.nextBtn.onclick = function () {
      _this.index ++;
      _this.index == _this.countBtn.length && (_this.index = 0);
      _this.toggle(_this.index);
    }
    this.banner.onmouseover = function () {
      clearInterval(_this.play);
    }
    this.banner.onmouseout = function () {
      _this.autoplay();
    }
  },
  // 下一张
  next: function() {
    this.index++;
    this.index == this.countBtn.length && (this.index = 0);
    this.toggle(this.index);
  },
  // 切换
  toggle: function(index) {
    for (var i = 0; i < this.countBtn.length; i++) this.countBtn[i].className = "";
    this.countBtn[index].className = "active";
    this.fade();
  },
  // 动画
  fade: function() {
    clearInterval(this.timer);
    for (var i = 0; i < this.sliderItem.length; i++) {
      this.sliderItem[i].style.opacity = 0;
      this.sliderItem[i].style.filter = "alpha(opacity = 0)";
      this.sliderItem[i].style.display = "none";
      this.sliderItem[this.index].style.display = "block";
    }
    var _this = this;
    this.timer = setInterval(function() {
      _this.speed += 4;
      _this.sliderItem[_this.index].style.opacity = (_this.speed) / 100;
      _this.sliderItem[_this.index].style.filter = "alpha(opacity = " + _this.speed + ")";
      if (_this.speed >= 100) {
        _this.speed = 0;
        clearInterval(_this.timer);
        
      }
    }, 40);
  },
  autoplay : function () {
    var _this = this;
    this.play = setInterval(function () {
      _this.next();
    }, 2500);
  },
  setMarginLT : function () {
    var marginL = $(".slider-item").width()/2;
    var marginT = $(".slider-item").height()/2;
    $(".slider-item").css("margin-left",-marginL + "px");
    $(".slider-item").css("margin-top",-marginT + "px");
  }
}

window.onload = function() {
  new Slider();
}
