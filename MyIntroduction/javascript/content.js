//获取日期
var date = document.getElementsByClassName("date")[0];
var spans = date.getElementsByTagName("span");
function getTime() {
    var showDate = new Date();
    var dateArr = [];
    var myYear = showDate.getFullYear();
    var myMonth = showDate.getMonth() + 1
    var myDate = showDate.getDate();
    dateArr.push(myYear, myMonth, myDate);
    for (var i = 0; i < dateArr.length; i++) {
        spans[i].innerHTML = format(dateArr[i])
    }
}

function format(argument) {
    return argument.toString().replace(/^(\d)$/, "0$1"); //匹配只有一个数字的情况下，$1表示前面"()"匹配的内容
}
getTime();

//切换主题
var changeTheme = document.getElementsByClassName("change-theme")[0];
var content = document.getElementById("content");
var body = document.querySelector("body");
var isChange = false;
changeTheme.addEventListener("click", function() {
    body.className = isChange == false ? "theme" : "";
    isChange = !isChange;
})

//展开-收缩
var title = document.getElementsByClassName("title");
var arrow = document.getElementsByClassName("arrow");
var showDiv = document.getElementsByClassName("show");
for(var i=0;i<title.length;i++){
    title[i].index = i;
    title[i].isShow = false;
    title[i].addEventListener("click",function () {
        show(this);
        this.isShow = !this.isShow;
    });
}
function show (whichTitle) {
    var index = whichTitle.index;
    var isShow = whichTitle.isShow;
    var img = title[index].getElementsByTagName("img")[0];
    var downSrc = img.src.replace(/up/,"down");
    var upSrc = img.src.replace(/down/,"up");
    clearInterval(up);
    clearInterval(down);
    if(isShow){//isShow为true 点击展开
        showDiv[index].style.display = "block";
        var showTime = 0;
        var down = setInterval(function () {
        showTime += 10;
        showDiv[index].style.opacity = showTime/100;
        if(showTime >= 100) {
            img.src = downSrc;
            clearInterval(down);
        }
        },50);
    }else {//isShow为false 点击收起
        var showTime = 100;
        var up = setInterval(function () {
        showTime -= 10;
        showDiv[index].style.opacity = showTime/100;
        if(showTime <= 0) {
            img.src = upSrc;
            showDiv[index].style.display = "none";
            clearInterval(up);
        }
        },50);
   }
}
