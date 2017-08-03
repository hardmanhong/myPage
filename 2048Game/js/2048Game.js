/**
 * 作者: Up Hong
 * 开发时间: 10 days
 * 已完成: 数字格子上下左右移动并合并
 * 未完成: 分数计算
 */

var Game2048 = function() {
    this.init();
}
var Game2048pro = Game2048.prototype;
Game2048pro.init = function() {
    var _this = this;
    this.count;
    this.overlay = util.getElement(".game-over")[0];
    this.createBox();
    this.game2048 = util.getElement(".game-2048")[0];
    this.game2048.addEventListener("touchstart", function(e) {
        _this.touchstart(e, _this);
    });
    this.game2048.addEventListener("touchend", function(e) {
        _this.touchend(e, _this);
    });
    this.relayBtn = util.getElement(".game-btns")[0];
    this.relayBtn.addEventListener("click", function() {
        if (_this.overlay.style.display == "block") {
            util.addClass(_this.overlay,"scalesmall");
            // _this.overlay.style.display = "none";
        }
        _this.rePlay(_this);
    });
    this.overlayBtn = util.getElement(".game-over-btn")[0];
    this.overlayBtn.addEventListener("click", function() {
        // _this.overlay.style.display = 'none';
        util.addClass(_this.overlay,"scalesmall");
        _this.rePlay(_this);
    });
}
Game2048pro.fullBoxs = function() {
    var boxs = util.getElement(".box");
    var isFull = false;
    if (boxs.length == 32) {
        return isFull = true;
    }
    return isFull;
}
Game2048pro.createBox = function() {
    var _this = this;
    if (this.fullBoxs()) return;
    var blankBoxs = util.getElement(".place-holder-box"),
        lis = util.getElement(".row"),
        divIndex = parseInt(Math.random() * blankBoxs.length),
        theBox = blankBoxs[divIndex], //某个空盒子
        liItem = parseInt(divIndex / 4), //第几个li
        divItem = divIndex % 4, //第几个li中的第几个div盒子
        theBoxLeft = theBox.offsetLeft, //该盒子的left值
        num = parseInt(Math.random() * (4 - 2 + 1) + 2),
        rem = num % 2;
    num = rem == 0 ? num : num - 1; //对余数进行判断，生成2或4

    var newBox = document.createElement("div");
    var holderClassName = "grid" + liItem + "-" + divItem;
    var numberClassName = "number-" + num;
    var holderBox = util.getElement("." + holderClassName)[0];
    if (holderBox) { //如果该位置已有盒子
        this.createBox();
    } else {
        util.addClass(newBox, "box scale create-box " + numberClassName + " " + holderClassName);
        newBox.style.left = theBoxLeft + "px";
        newBox.innerText = num;
        newBox.style["z-index"] = 1;
        lis[liItem].appendChild(newBox);
    }
}
Game2048pro.saveGridInfo = function(arrIndex, arr, sortArr, direction) {
    var count = 0;
    for (var j = 0; j < 4; j++) {
        var str,
            moveClassName,
            divItemText,
            gridInfo,
            divItem,
            re;
        switch (direction) {
            case "right":
            case "left":
                str = "grid" + arrIndex + "-" + j;
                break;
            case "top":
            case "bottom":
                str = "grid" + j + "-" + arrIndex;
                break;
        }
        gridInfo = {};
        divItem = util.getElement("." + str)[0];
        re = new RegExp("(right|left|top|bottom)\\d\\-\\d", "g");
        moveClassName = !!divItem ? divItem.className.match(re) : null;
        moveClassName = !!moveClassName ? moveClassName[0] : null;
        divItemText = !!divItem ? parseInt(divItem.innerText) : 0;
        gridInfo.divElement = !!divItem ? divItem : null;
        gridInfo.value = divItemText;
        gridInfo.className = str;
        gridInfo.moveClassName = moveClassName;

        arr.push(gridInfo);
        switch (direction) {
            case "right":
            case "bottom":
                divItemText == 0 && sortArr.unshift(gridInfo); //左右区别在这里 push()
                divItemText > 0 && sortArr.push(gridInfo); //左右区别 unshift()
                break;
            case "left":
            case "top":
                divItemText > 0 && sortArr.push(gridInfo); //左右区别在这里 push()
                divItemText == 0 && count++;
                break;
        }
    }
    for (var o = 0; o < count; o++) {
        sortArr.push({ value: 0, className: null, moveClassName: null, divElement: null });
    }
}
Game2048pro.sortoutBox = function(sortArr, k, moveIndex) {
    var _this = this;
    var removeNode = sortArr[k].divElement;
    _this.moveBeforeValue = sortArr[moveIndex].value;
    _this.moveAfterValue = sortArr[k].value + sortArr[moveIndex].value; //移动元素在移动后的值
    removeNode.parentElement.removeChild(removeNode);
    sortArr[moveIndex].value = _this.moveAfterValue;
    sortArr.splice(k, 1);
}
Game2048pro.sortGridInfo = function(sortArr, direction) {
    switch (direction) {
        case "right":
        case "bottom":
            for (var k = sortArr.length - 1; k > 0; k--) { //right bottom
                //如果排序后的数组
                if (sortArr[k].value == 0) continue;
                if (sortArr[k].value === sortArr[k - 1].value) {
                    var moveIndex = k - 1; //要移动的元素的数组下标
                    this.sortoutBox(sortArr, k, moveIndex);
                    sortArr.unshift({ value: 0, className: null, moveClassName: null, divElement: null });
                    this.count = 0;
                }
            }
            break;
        case "left":
        case "top":
            for (var k = 0; k < sortArr.length - 1; k++) { // left top
                if (sortArr[k].value == 0) continue;
                if (sortArr[k].value === sortArr[k + 1].value) {
                    var moveIndex = k + 1;
                    this.sortoutBox(sortArr, k, moveIndex);
                    sortArr.push({ value: 0, className: null, moveClassName: null, divElement: null }); //left top push()
                    this.count = 0;
                }
            }
            break;
    }
}
Game2048pro.moveBoxs = function(arr, sortArr, direction) {
    for (var l = 0; l < arr.length; l++) {
        if (!arr[l].divElement) continue;
        var arrElement = arr[l].divElement;
        var arrClassName = arr[l].className;
        for (var p = 0; p < sortArr.length; p++) {
            if (!sortArr[p].divElement) continue;
            var sortArrElement = sortArr[p].divElement;
            if (arrElement === sortArrElement) {
                if (p - l == 0) break;
                /*
                    遇到的大BUG之一:
                    假如前面有盒子的类名改变之后与当前要获取的类名一样，
                    那么获取的盒子就不确定是哪一个了，
                    所以我把元素存进数组，遍历获取的类名元素，与数组中的原来的元素进行比较
                */
                var boxs = util.getElement("." + arrClassName);
                var moveBox;
                for (var q = 0; q < boxs.length; q++) {
                    if (boxs[q] === sortArrElement) {
                        moveBox = boxs[q];
                        break;
                    }
                }
                switch (direction) {
                    case "right":
                    case "left":
                        var num = arrClassName.substr(4, 1); // 右滑，下滑区别在这里 下滑substr(6,1)
                        util.replaceClass(moveBox, arrClassName, "grid" + num + "-" + p);
                        if (!!moveBox.lastTopLocation) moveBox.style.top = (moveBox.lastTopLocation * 74) + "px";
                        moveBox.style.left = 0; //清除定位，避免左右滑动动画无法正常执行
                        moveBox.lastLeftLocation = p; //相对父元素left值，下面向上/下滑动时会用到
                        break;
                    case "top":
                    case "bottom":
                        var numIndex = arrClassName.substr(6, 1); // 右滑，下滑区别在这里 下滑substr(6,1)
                        util.replaceClass(moveBox, arrClassName, "grid" + p + "-" + numIndex);
                        if (!!moveBox.lastLeftLocation) moveBox.style.left = (moveBox.lastLeftLocation * 74) + "px";
                        moveBox.lastTopLocation = p; //相对父元素top值，下面向左/右滑动时会用到
                        moveBox.style.top = 0;
                        break;
                }!!sortArr[p].moveClassName ?
                    util.replaceClass(moveBox, sortArr[p].moveClassName, direction + l + "-" + p) :
                    util.addClass(moveBox, direction + l + "-" + p);
                moveBox.innerText = sortArr[p].value;
                util.replaceClass(moveBox, "number-\\d+", "number-" + sortArr[p].value);
                break;
            }
        }
    }
}
Game2048pro.move = function(direction) {
    for (var i = 0; i < 4; i++) {
        var arr = [];
        var sortArr = [];
        this.saveGridInfo(i, arr, sortArr, direction);
        this.sortGridInfo(sortArr, direction);
        this.moveBoxs(arr, sortArr, direction);
    }
}
Game2048pro.touchstart = function(e, context) {
    this.startX = e.changedTouches[0].pageX;
    this.startY = e.changedTouches[0].pageY;
}
Game2048pro.touchend = function(e, context) {
    this.moveX = e.changedTouches[0].pageX - this.startX;
    this.moveY = e.changedTouches[0].pageY - this.startY;
    var absX = Math.abs(this.moveX); //X绝对值
    var absY = Math.abs(this.moveY); //Y绝对值
    if (absX < 5 && absY < 5) return;
    if (absX > absY && this.moveX > 0) {
        context.move("right");
    }
    if (absX > absY && this.moveX < 0) {
        context.move("left");
    }
    if (absX < absY && this.moveY > 0) {
        context.move("bottom");
    }
    if (absX < absY && this.moveY < 0) {
        context.move("top");
    }
    if (this.fullBoxs()) {
            this.count++;
            if(this.count>=4) {
                context.overlay.style.display = 'block';
                util.addClass(context.overlay,"scale");
                return;
            }
    }
    setTimeout(function() {
        context.createBox();
    }, 500);

}
Game2048pro.rePlay = function(context) {
    var rowLis = util.getElement(".row");
    for (var i = 0; i < rowLis.length; i++) {
        var boxs = util.getElement(".create-box", rowLis[i]);
        if (boxs.length <= 0) continue;
        var len = boxs.length;
        for (var j = 0; j < len; j++) {
            var box = boxs[0];
            rowLis[i].removeChild(box);
        }
    }
    context.createBox();
}
new Game2048;