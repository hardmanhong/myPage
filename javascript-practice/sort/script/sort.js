window.onload = function() {
    var wrap = document.getElementById("wrap");
    var childrenDiv = wrap.children;
    var sortTimes = 0;
    var id = null;
    //排序
    function sortData() {
        var subtractHeight = 0;
        // var wrap = document.getElementById("wrap");
        // var childrenDiv = wrap.children; //插入结束后，取得所有的子元素
        if (childrenDiv.length >= 2) { //如果子元素数量大于2
            for (var i = 0; i < childrenDiv.length; i++) {
                var theChildren = childrenDiv[i]; //
                var theHeight = parseInt(childrenDiv[i].style.height);
                if (childrenDiv[i + 1]) {
                    var siblingChildren = childrenDiv[i + 1];
                    var nextHeight = parseInt(childrenDiv[i + 1].style.height);
                    subtractHeight = theHeight - nextHeight;
                    if (subtractHeight > 0) {
                        theChildren.style.height = nextHeight + "px";
                        siblingChildren.style.height = theHeight + "px";
                    }
                }
            }
        }
        sortTimes++;
        if (sortTimes == childrenDiv.length-1) {
            clearInterval(id);
        }
        console.log("sortTimes")+console.log(sortTimes);
        
    };
    //点击哪个按钮
    function whichBtn(BtnID) {
        console.log('whichBtn');
        var input = document.getElementById("text-input");
        var inputValue = input.value;
        console.log(inputValue);
        if ((BtnID != "bubble-sort")&&(BtnID != "insert-data")) {
            if (!inputValue || (inputValue <= 10 || inputValue > 100)) {
                alert("请输入10-100的数值");
                return false;
            }
        }
        var wrap = document.getElementById("wrap");
        var newElement = document.createElement("div");
        newElement.style.height = inputValue + "px";
        var theFirstChild = wrap.firstChild;
        var theLastChild = wrap.lastChild;

        switch (BtnID) {
            case "left-into":
                wrap.insertBefore(newElement, theFirstChild); //插入到第一个元素前
                console.log("插入新的元素：");
                console.log(newElement);
                console.log("插入结束");
                break;
            case "right-into":
                wrap.insertBefore(newElement, theLastChild.nextSibling); //插入到最后一个元素
                console.log("插入新的元素：");
                console.log(newElement);
                console.log("插入结束");
                break;
            case "left-out":
                alert(theFirstChild.style.height);
                wrap.removeChild(theFirstChild);
                break;
            case "right-out":
                alert(theLastChild.style.height);
                wrap.removeChild(theLastChild);
                break;
            case "bubble-sort":
                id = setInterval(sortData, 300);
                break;
             case "insert-data":
                var insertData =    "<div style=height:95px;></div>"+"<div style=height:50px;></div>"
                                    +"<div style=height:77px;></div>"+"<div style=height:88px;></div>"
                                    +"<div style=height:43px;></div>"+"<div style=height:35px;></div>"
                                    +"<div style=height:33px;></div>"+"<div style=height:20px;></div>"
                                    +"<div style=height:99px;></div>"+"<div style=height:15px;></div>"
                                    +"<div style=height:69px;></div>"+"<div style=height:81px;></div>"
                                    +"<div style=height:47px;></div>"+"<div style=height:35px;></div>"
                                    +"<div style=height:54px;></div>"+"<div style=height:75px;></div>"
                                    +"<div style=height:76px;></div>"+"<div style=height:87px;></div>"
                                    +"<div style=height:12px;></div>"+"<div style=height:51px;></div>"
                                    +"<div style=height:65px;></div>"+"<div style=height:85px;></div>"
                                    +"<div style=height:23px;></div>"+"<div style=height:100px;></div>"
                                    +"<div style=height:86px;></div>"+"<div style=height:31px;></div>"
                                    +"<div style=height:61px;></div>"+"<div style=height:87px;></div>"
                                    +"<div style=height:49px;></div>"+"<div style=height:39px;></div>"
                                    +"<div style=height:38px;></div>"+"<div style=height:86px;></div>"
                                    +"<div style=height:73px;></div>"+"<div style=height:45px;></div>"
                                    +"<div style=height:48px;></div>"+"<div style=height:65px;></div>"
                                    +"<div style=height:79px;></div>"+"<div style=height:79px;></div>"
                                    +"<div style=height:61px;></div>"+"<div style=height:52px;></div>"
                                    +"<div style=height:81px;></div>"+"<div style=height:56px;></div>"
                                    +"<div style=height:23px;></div>"+"<div style=height:78px;></div>"
                                    +"<div style=height:73px;></div>"+"<div style=height:62px;></div>"
                                    +"<div style=height:53px;></div>"+"<div style=height:76px;></div>"
                                    +"<div style=height:96px;></div>"+"<div style=height:51px;></div>";
                wrap.innerHTML = insertData;
                break;
        }
    };
    var btns = document.getElementsByTagName("button");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var btnID = this.getAttribute("id");
            console.log(btnID);
            whichBtn(btnID);
        })
    }
}
