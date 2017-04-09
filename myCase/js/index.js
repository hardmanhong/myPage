function Init() {
  this.init();
}
Init.prototype = {
  constructor: Init,
  init: function() {
    var _this = this;
    this.sliderItem = $(".slider-item");
    this.photosLink = $("a.photos-link");
    this.photosImg = $("a.photos-link>img");
    this.linkItem = $(".link-item");
    this.socialAccounts = $(".social-accounts");
    this.socialAccountsUl = $(".social-accounts>ul");
    this.socialItem = $(".social-item");
    this.setSliderItemMarginLT();
    this.setLinkItemHeight();
    this.setPhotosHeight();
    this.setSocialAccWH();
    this.photosLink.mouseenter(function(e) {
      $(this).find(".link-item").fadeIn();
    });
    this.photosLink.mouseleave(function(e) {
      $(this).find(".link-item").fadeOut();
    });
    $(window).resize(function() {
      _this.setSliderItemMarginLT();
      _this.setLinkItemHeight();
      _this.setPhotosHeight();
      _this.setSocialAccWH();
    });
  },
  setSliderItemMarginLT: function() {
    var marginL = this.sliderItem.width() / 2;
    var marginT = this.sliderItem.height() / 2;
    this.sliderItem.css("margin-left", -marginL + "px");
    this.sliderItem.css("margin-top", -marginT + "px");
  },
  setLinkItemHeight: function() {
    var imgHeight = this.photosImg.height();
    var paddingW = parseFloat(this.linkItem.css("padding"));
    var height = imgHeight - paddingW * 2;
    this.linkItem.height(height);
  },
  setPhotosHeight: function() {
    var h = $(".photos ul").height();
    $(".photos").height(h);
  },
  setSocialAccWH: function() {
    var w = this.socialItem.width();
    var h = this.socialItem.height();
    this.socialAccountsUl.width(w * this.socialItem.length);
    this.socialAccounts.width(w);
    this.socialAccounts.height(h);
  }
}

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

    for (var i = 0; i < this.countBtn.length; i++) {
      this.countBtn[i].index = i;
      this.countBtn[i].onclick = function() {
        _this.index = this.index;
        _this.toggle(_this.index);
      }
    }
    this.prevBtn.onclick = function() {
      _this.index--;
      _this.index < 0 && (_this.index = _this.countBtn.length - 1);
      _this.toggle(_this.index);
    }
    this.nextBtn.onclick = function() {
      _this.index++;
      _this.index == _this.countBtn.length && (_this.index = 0);
      _this.toggle(_this.index);
    }
    this.banner.onmouseover = function() {
      clearInterval(_this.play);
    }
    this.banner.onmouseout = function() {
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
  autoplay: function() {
    var _this = this;
    this.play = setInterval(function() {
      _this.next();
    }, 2500);
  }

}

function ShowPic() {
  this.init();
}
ShowPic.prototype = {
  constructor: ShowPic,
  init: function() {
    var _this = this;
    this.iNow = 0;
    this.iconBtn = $(".our-works-top .icon i");
    this.ul = $(".photos ul");
    this.iconBtn.click(function() {
      $(this).addClass("active").siblings().removeClass("active");
      var current = _this.iNow;
      if ($(this)[0].className.includes("fa-angle-left") && _this.iNow >= 1) {
        _this.iNow--;
      } else if ($(this)[0].className.includes("fa-angle-right") && _this.iNow < _this.ul.length - 1) {
        _this.iNow++;
      } else {
        return;
      }

      $(_this.ul[current]).addClass("out current").removeClass("in").siblings().removeClass("current");;
      setTimeout(function() {
        $(_this.ul[_this.iNow]).addClass("in current").removeClass("out").siblings().removeClass("current");
      }, 1000);


    });
  },
  rotateOut: function() {

  },
  rotateIn: function() {

  }
}

function Rotation () {
  this.init();
}
Rotation.prototype = {
  constructor : Rotation,
  init : function () {
    var _this = this;
    this.timer = null;
    this.index = 0;
    this.Bprev = this.Bnext = true;
    this.socialAccounts = $(".social-accounts");
    this.ul = $(".social-accounts>ul");
    this.li = $(".social-accounts>ul li");
    this.prevBtn = $(".contact-us-middle .prev");
    this.nextBtn = $(".contact-us-middle .next");
    this.prevBtn.click(function () {
      if(!_this.Bprev) return;
      _this.Bnext = true;
      _this.index--;
      _this.nextBtn.css("opacity","1");
      _this.toggle();
      if(_this.index ==0 ) {
        _this.prevBtn.css("opacity","0.3");
        _this.Bprev = false;
      }
    });
     this.nextBtn.click(function () {
      _this.Bprev = true;
      if(!_this.Bnext) return;
      _this.index++;
       _this.prevBtn.css("opacity","1");
      _this.toggle();
      if(_this.index == _this.li.length-1) {
        _this.nextBtn.css("opacity","0.3");
        _this.Bnext = false;
      }
    });
  },
  toggle : function () {
    clearInterval(this.timer);
    var target = -(this.index * this.li.width());
    this.move(target);
  },
  move : function (target) {
    var _this = this;
    this.timer = setInterval(function () {
      /* body... */
      // console.log(target);
      var prev = parseFloat(_this.ul.css("left"));
      var speed = (target - prev)/5;

      // speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      prev == target ? clearInterval(_this.timer) : (_this.ul.css("left",prev + speed + "px"))
    }, 30);
  },
  isContinue : function () {
    // if(this.Bcontinue)
  }
}
window.onload = function() {
  new Slider();
  new Init();
  new ShowPic();
  new Rotation();
}
