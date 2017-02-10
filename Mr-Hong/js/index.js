/* ======= 固定导航栏 ========= */

$(window).on('scroll resize load', function() {


    $('#nav-wrapper').removeClass('fixed');
    //获取滚动的距离
    var scrollDistance = $(this).scrollTop();
    //获取到顶部的距离
    var topDistance = $('#nav-wrapper').offset().top;
    if ((topDistance) > scrollDistance) {
        $('#nav-wrapper').removeClass('fixed');
    } else {
        $('#nav-wrapper').addClass('fixed');
    }
});

/* ======= 收缩导航栏 ========= */

$("#navbar-toggle-btn").click(function() {
    $(".sm-device").slideToggle("slow");
});

/* ======= 画图表 ========= */

$('.chart').easyPieChart({
    trackColor: '#e8e8e8', //初始颜色
    barColor: '#795548', //填充的颜色
    scaleColor: false, //比例尺显示
    lineWidth: 5, //填充的宽度
    animate: 2000, //时间
    onStep: function(from, to, percent) {
        $(this.el).find('span').text(Math.round(percent));
    }
});
