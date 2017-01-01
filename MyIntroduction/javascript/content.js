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
var isChange = false;
changeTheme.addEventListener("click", function() {
    content.style.backgroundColor = isChange == false ? "#151518" : "";
    content.style.color = isChange == false ? "#aaa" : "";
    isChange = !isChange;
})

//展开-收缩
var title = document.getElementsByClassName("title");
var arrow = document.getElementsByClassName("arrow");
var showDiv = document.getElementsByClassName("show");
// console.log(title);
// console.log(show);
for(var i=0;i<title.length;i++){
    title[i].addEventListener("click",function () {
        var text = this.innerText;
        show(text);
    });
}

function show (text) {
    var text = text;
    switch (text) {
        case "学习":
            console.log("学习");
            break;
        case "个人作品 —— 点击图片预览":
            console.log("个人作品 —— 点击图片预览");
            break;
        case "爱好":
            console.log("爱好");
            break;
    }
}
